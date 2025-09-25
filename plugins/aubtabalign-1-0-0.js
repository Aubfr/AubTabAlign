// AubTabAlign Plugin for Starfish Proxy
// Adds spaces/indentation to TAB list after /who command while preserving ranks and stats

module.exports = (api) => {
    api.metadata({
        name: 'aubtabalign',
        displayName: 'AubTabAlign',
        prefix: '§bATA',
        version: '1.0.0',
        author: 'Starfish Proxy User',
        description: 'Adds customizable spaces/indentation to TAB list after /who command execution',
    });

    const aubTabAlign = new AubTabAlign(api);
    
    const configSchema = [
        {
            label: 'Plugin Settings',
            description: 'Configure AubTabAlign plugin behavior.',
            defaults: { 
                enabled: true,
                spacesCount: 4,
                autoRealignOnJoin: true,
                autoRealignOnRespawn: true
            },
            settings: [
                {
                    type: 'toggle',
                    key: 'enabled',
                    text: ['OFF', 'ON'],
                    description: 'Enable or disable AubTabAlign plugin functionality.',
                    onChange: (newValue) => {
                        if (!newValue) {
                            aubTabAlign.clearAllAlignment();
                        }
                    }
                },
                {
                    type: 'cycle',
                    key: 'spacesCount',
                    description: 'Number of spaces to add for indentation alignment.',
                    displayLabel: 'Spaces',
                    values: [
                        { text: '2 spaces', value: 2 },
                        { text: '4 spaces', value: 4 },
                        { text: '6 spaces', value: 6 },
                        { text: '8 spaces', value: 8 },
                        { text: '10 spaces', value: 10 }
                    ]
                },
                {
                    type: 'toggle',
                    key: 'autoRealignOnJoin',
                    text: ['OFF', 'ON'],
                    description: 'Automatically realign TAB list when players join the game.'
                },
                {
                    type: 'toggle',
                    key: 'autoRealignOnRespawn',
                    text: ['OFF', 'ON'],
                    description: 'Automatically realign TAB list when you respawn or change servers.'
                }
            ]
        }
    ];

    api.initializeConfig(configSchema);
    api.configSchema(configSchema);

    api.commands((registry) => {
        registry
            .command("toggle")
            .description("Enable or disable AubTabAlign plugin")
            .handler((ctx) => {
                const currentEnabled = api.config.get('enabled');
                const newEnabled = !currentEnabled;
                api.config.set('enabled', newEnabled);
                
                if (newEnabled) {
                    ctx.send("§aAubTabAlign enabled! Use /who to see aligned TAB list.");
                } else {
                    aubTabAlign.clearAllAlignment();
                    ctx.send("§cAubTabAlign disabled and alignment cleared.");
                }
            });

        registry
            .command("settings")
            .description("Open AubTabAlign configuration UI")
            .handler((ctx) => {
                ctx.send("§eOpening AubTabAlign configuration... Use the built-in /aubtabalign config command.");
                // The config UI is automatically handled by the plugin system
            });

        registry
            .command("realign")
            .description("Manually realign the TAB list now")
            .handler((ctx) => {
                if (!api.config.get('enabled')) {
                    ctx.send("§cAubTabAlign is disabled. Use /aubtabalign toggle to enable it.");
                    return;
                }
                
                aubTabAlign.manualAlignment();
                ctx.send("§aTAB list realigned!");
            });

        registry
            .command("clear")
            .description("Clear all TAB list alignment")
            .handler((ctx) => {
                aubTabAlign.clearAllAlignment();
                ctx.send("§eAll TAB list alignment cleared.");
            });
    });
    
    aubTabAlign.registerHandlers();
    return aubTabAlign;
};

class AubTabAlign {
    constructor(api) {
        this.api = api;
        this.PLUGIN_PREFIX = this.api.getPrefix();
        this.whoCommandDetected = false;
        this.alignedPlayers = new Set();
        this.lastWhoTime = 0;
    }

    registerHandlers() {
        this.api.on('chat', this.onChat.bind(this));
        this.api.on('player_join', this.onPlayerJoin.bind(this));
        this.api.on('respawn', this.onRespawn.bind(this));
        this.api.on('player_info', this.onPlayerListUpdate.bind(this));
        this.api.on('plugin_restored', this.onPluginRestored.bind(this));
    }

    onChat(event) {
        try {
            if (!this.api.config.get('enabled') || !event || !event.message) {
                return;
            }

            const message = event.message;
            
            // Detect when player executes /who command
            if (this.isWhoCommandMessage(message)) {
                this.api.debugLog('Detected /who command execution');
                this.whoCommandDetected = true;
                this.lastWhoTime = Date.now();
                
                // Apply alignment after a short delay to ensure player list is updated
                setTimeout(() => {
                    this.applyAlignment();
                }, 1000);  // Increased delay to 1 second
            }
        } catch (error) {
            this.api.log(`Error in onChat: ${error.message}`);
        }
    }

    onPlayerJoin(event) {
        try {
            if (!this.api.config.get('enabled') || !this.api.config.get('autoRealignOnJoin')) {
                return;
            }

            // Realign when new players join if we recently used /who
            if (this.whoCommandDetected && (Date.now() - this.lastWhoTime < 60000)) { // Within 1 minute of /who
                setTimeout(() => {
                    this.applyAlignment();
                }, 2000);  // Increased delay for player join
            }
        } catch (error) {
            this.api.log(`Error in onPlayerJoin: ${error.message}`);
        }
    }

    onRespawn(event) {
        if (!this.api.config.get('enabled')) {
            return;
        }

        // Clear alignment when respawning/changing servers
        this.clearAllAlignment();
        this.whoCommandDetected = false;
        
        if (this.api.config.get('autoRealignOnRespawn')) {
            this.api.debugLog('Respawn detected, cleared alignment');
        }
    }

    onPlayerListUpdate(event) {
        if (!this.api.config.get('enabled') || !this.whoCommandDetected) {
            return;
        }

        // When player list updates after /who, apply alignment
        if (event.action === 0) { // ADD_PLAYER action
            setTimeout(() => {
                this.applyAlignment();
            }, 100);
        }
    }

    onPluginRestored(event) {
        if (event.pluginName === 'aubtabalign') {
            this.clearAllAlignment();
            this.whoCommandDetected = false;
            this.alignedPlayers.clear();
        }
    }

    isWhoCommandMessage(message) {
        if (!message || typeof message !== 'string') {
            return false;
        }
        
        try {
            // Clean message from color codes
            const cleanMessage = message.replace(/§[0-9a-fk-or]/g, '').trim().toLowerCase();
            
            // Common patterns that indicate /who command was executed
            const whoPatterns = [
                'online:',
                'players (',
                'total players online',
                'players in this lobby'
            ];

            return whoPatterns.some(pattern => cleanMessage.includes(pattern));
        } catch (error) {
            this.api.log(`Error in isWhoCommandMessage: ${error.message}`);
            return false;
        }
    }

    applyAlignment() {
        if (!this.api.config.get('enabled')) {
            return;
        }

        try {
            const players = this.api.players || [];
            const spacesCount = this.api.config.get('spacesCount') || 4;

            this.api.debugLog(`Applying alignment with ${spacesCount} spaces to ${players.length} players`);

            for (const player of players) {
                if (player && player.uuid && !this.alignedPlayers.has(player.uuid)) {
                    // Try different alignment approaches based on configuration
                    if (spacesCount <= 4) {
                        // For small alignment, use prefix with regular spaces
                        const alignmentSpaces = ' '.repeat(spacesCount);
                        this.api.setDisplayNamePrefix(player.uuid, alignmentSpaces);
                    } else {
                        // For larger alignment, try suffix with special formatting
                        const alignmentString = ' '.repeat(spacesCount - 4) + '    ';
                        this.api.prependDisplayNameSuffix(player.uuid, alignmentString);
                    }
                    
                    this.alignedPlayers.add(player.uuid);
                    this.api.debugLog(`Applied alignment to player: ${player.name}`);
                }
            }

            // Send confirmation message only if debug is enabled
            if (players.length > 0 && this.api.debug) {
                this.api.chat(`${this.PLUGIN_PREFIX} §aApplied alignment to ${players.length} players.`);
            }
        } catch (error) {
            this.api.log(`Error in applyAlignment: ${error.message}`);
        }
    }

    clearAllAlignment() {
        try {
            this.api.debugLog('Clearing all TAB alignment');
            
            // Clear both prefix and suffix for all aligned players
            for (const uuid of this.alignedPlayers) {
                this.api.clearDisplayNamePrefix(uuid);
                this.api.clearDisplayNameSuffix(uuid);
            }
            
            // Also clear any remaining display names via the bulk clear
            this.api.clearAllDisplayNames();
            
            this.alignedPlayers.clear();
            this.whoCommandDetected = false;
        } catch (error) {
            this.api.log(`Error in clearAllAlignment: ${error.message}`);
        }
    }

    // Helper method to manually trigger alignment (used by realign command)
    manualAlignment() {
        try {
            this.whoCommandDetected = true;
            this.lastWhoTime = Date.now();
            this.applyAlignment();
        } catch (error) {
            this.api.log(`Error in manualAlignment: ${error.message}`);
        }
    }
}