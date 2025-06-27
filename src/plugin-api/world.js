class World {
    constructor(proxy, core) {
        this.proxy = proxy;
        this.core = core;
    }
    
    get gameState() {
        return this.proxy.currentPlayer?.gameState || null;
    }
    
    getTeams() {
        if (!this.proxy.currentPlayer?.gameState) return [];
        
        const teams = [];
        for (const [name, team] of this.proxy.currentPlayer.gameState.teams) {
            teams.push({
                name: name,
                displayName: team.displayName,
                prefix: team.prefix,
                suffix: team.suffix,
                color: team.color,
                players: Array.from(team.players)
            });
        }
        return teams;
    }
    
    getPlayerTeam(playerName) {
        if (!this.proxy.currentPlayer?.gameState) return null;
        
        const teamData = this.proxy.currentPlayer.gameState.getPlayerTeam(playerName);
        if (!teamData) return null;
        
        return {
            name: teamData.name,
            displayName: teamData.displayName,
            prefix: teamData.prefix,
            suffix: teamData.suffix,
            color: teamData.color,
            players: Array.from(teamData.players)
        };
    }
    
    sendExplosion(x, y, z, radius, records = [], playerMotionX = 0, playerMotionY = 0, playerMotionZ = 0) {
        if (!this.core.isHypixelSafe('sendExplosion')) {
            this.core.logHypixelBlock('sendExplosion');
            return false;
        }
        if (!this.proxy.currentPlayer?.client) return false;
        
        try {
            return this.proxy.currentPlayer.client.write('explosion', {
                x,
                y,
                z,
                radius,
                records,
                playerMotionX,
                playerMotionY,
                playerMotionZ
            });
        } catch (error) {
            this.core.log(`Failed to send explosion: ${error.message}`);
            return false;
        }
    }
    
    sendBlockChange(location, type) {
        if (!this.core.isHypixelSafe('sendBlockChange')) {
            this.core.logHypixelBlock('sendBlockChange');
            return false;
        }
        if (!this.proxy.currentPlayer?.client) return false;
        
        try {
            return this.proxy.currentPlayer.client.write('block_change', {
                location,
                type
            });
        } catch (error) {
            this.core.log(`Failed to send block change: ${error.message}`);
            return false;
        }
    }
    
    sendMultiBlockChange(chunkX, chunkZ, records) {
        if (!this.core.isHypixelSafe('sendMultiBlockChange')) {
            this.core.logHypixelBlock('sendMultiBlockChange');
            return false;
        }
        if (!this.proxy.currentPlayer?.client) return false;
        
        try {
            return this.proxy.currentPlayer.client.write('multi_block_change', {
                chunkX,
                chunkZ,
                records
            });
        } catch (error) {
            this.core.log(`Failed to send multi block change: ${error.message}`);
            return false;
        }
    }
    
    sendWorldEvent(effectId, location, data, disableRelativeVolume = false) {
        if (!this.core.isHypixelSafe('sendWorldEvent')) {
            this.core.logHypixelBlock('sendWorldEvent');
            return false;
        }
        if (!this.proxy.currentPlayer?.client) return false;
        
        try {
            return this.proxy.currentPlayer.client.write('world_event', {
                effectId,
                location,
                data,
                disableRelativeVolume
            });
        } catch (error) {
            this.core.log(`Failed to send world event: ${error.message}`);
            return false;
        }
    }
    
    sendTimeUpdate(age, time) {
        if (!this.core.isHypixelSafe('sendTimeUpdate')) {
            this.core.logHypixelBlock('sendTimeUpdate');
            return false;
        }
        if (!this.proxy.currentPlayer?.client) return false;
        
        try {
            return this.proxy.currentPlayer.client.write('time_update', {
                age,
                time
            });
        } catch (error) {
            this.core.log(`Failed to send time update: ${error.message}`);
            return false;
        }
    }
    
    sendSpawnPosition(x, y, z) {
        if (!this.core.isHypixelSafe('sendSpawnPosition')) {
            this.core.logHypixelBlock('sendSpawnPosition');
            return false;
        }
        if (!this.proxy.currentPlayer?.client) return false;
        
        try {
            return this.proxy.currentPlayer.client.write('spawn_position', {
                location: { x, y, z }
            });
        } catch (error) {
            this.core.log(`Failed to send spawn position: ${error.message}`);
            return false;
        }
    }
    
    sendGameStateChange(reason, gameMode) {
        if (!this.core.isHypixelSafe('sendGameStateChange')) {
            this.core.logHypixelBlock('sendGameStateChange');
            return false;
        }
        if (!this.proxy.currentPlayer?.client) return false;
        
        try {
            return this.proxy.currentPlayer.client.write('game_state_change', {
                reason,
                gameMode
            });
        } catch (error) {
            this.core.log(`Failed to send game state change: ${error.message}`);
            return false;
        }
    }
    
    sendScoreboardObjective(objectiveName, mode, objectiveValue = '', type = 'integer') {
        if (!this.proxy.currentPlayer?.client) return false;
        
        try {
            return this.proxy.currentPlayer.client.write('scoreboard_objective', {
                objectiveName,
                mode,
                objectiveValue,
                type
            });
        } catch (error) {
            this.core.log(`Failed to send scoreboard objective: ${error.message}`);
            return false;
        }
    }
    
    sendScoreboardScore(itemName, action, scoreName, value = 0) {
        if (!this.proxy.currentPlayer?.client) return false;
        
        try {
            return this.proxy.currentPlayer.client.write('scoreboard_score', {
                itemName,
                action,
                scoreName,
                value
            });
        } catch (error) {
            this.core.log(`Failed to send scoreboard score: ${error.message}`);
            return false;
        }
    }
    
    sendScoreboardDisplay(position, scoreName) {
        if (!this.proxy.currentPlayer?.client) return false;
        
        try {
            return this.proxy.currentPlayer.client.write('scoreboard_display_objective', {
                position,
                scoreName
            });
        } catch (error) {
            this.core.log(`Failed to send scoreboard display: ${error.message}`);
            return false;
        }
    }
    
    sendTeams(team, mode, name = '', prefix = '', suffix = '', friendlyFire = 0, nameTagVisibility = 'always', color = -1, players = []) {
        if (!this.proxy.currentPlayer?.client) return false;
        
        try {
            return this.proxy.currentPlayer.client.write('teams', {
                team,
                mode,
                name,
                prefix,
                suffix,
                friendlyFire,
                nameTagVisibility,
                color,
                players
            });
        } catch (error) {
            this.core.log(`Failed to send teams: ${error.message}`);
            return false;
        }
    }
}

module.exports = World; 