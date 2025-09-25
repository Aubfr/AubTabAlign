# AubTabAlign Plugin for Starfish Proxy

A JavaScript plugin for Starfish Proxy (Minecraft Hypixel) that adds customizable spaces/indentation to the TAB list after executing `/who`, while keeping player ranks, stats, and other display information intact.

## Features

- ✅ **Automatic TAB List Alignment**: Automatically adds spaces/indentation after `/who` command execution
- ✅ **Preserve Player Information**: Keeps existing ranks, stats, and display data intact
- ✅ **Configurable Spacing**: Choose between 2, 4, 6, 8, or 10 spaces for indentation
- ✅ **Toggle On/Off**: Enable or disable the plugin on the fly
- ✅ **Auto-Realignment**: Automatically realigns when players join or you respawn (configurable)
- ✅ **Manual Controls**: Commands to manually realign or clear alignment
- ✅ **Safe Implementation**: Uses Starfish Proxy's safe display name API methods

## Installation

1. Place `aubtabalign-1-0-0.js` in your Starfish Proxy `plugins/` directory
2. Restart Starfish Proxy
3. The plugin will automatically load and be available

## Commands

All commands use the format `/aubtabalign <command>`:

### Core Commands
- `/aubtabalign toggle` - Enable or disable the plugin on the fly
- `/aubtabalign config` - Open the plugin configuration UI (built-in)
- `/aubtabalign settings` - Alternative command to access settings

### Manual Control Commands  
- `/aubtabalign realign` - Manually realign the TAB list immediately
- `/aubtabalign clear` - Remove all TAB list alignment

## Configuration Options

Access configuration via `/aubtabalign config` or the Starfish Proxy GUI:

### Plugin Settings
- **Enabled**: Toggle plugin functionality on/off
- **Spaces Count**: Choose indentation (2, 4, 6, 8, or 10 spaces)
- **Auto Realign on Join**: Automatically realign when new players join
- **Auto Realign on Respawn**: Automatically realign when you respawn/change servers

## How It Works

### Automatic Operation
1. **Detection**: Plugin monitors chat for `/who` command execution
2. **Timing**: Waits 500ms for player list to update after `/who`
3. **Alignment**: Adds configured spaces as prefix to all players in TAB list
4. **Preservation**: Existing ranks, team colors, and stats remain intact
5. **Auto-Update**: Realigns when players join/leave (if enabled)

### Manual Operation
- Use `/aubtabalign realign` to manually trigger alignment anytime
- Use `/aubtabalign clear` to remove all spacing and reset TAB list
- Use `/aubtabalign toggle` to quickly enable/disable functionality

## Technical Implementation

### Starfish Proxy API Usage
- `api.metadata()` - Plugin identification and display information
- `api.configSchema()` - Configuration UI and settings management  
- `api.commands()` - Command registration for toggle and config access
- `api.on('chat')` - Monitor chat for `/who` command detection
- `api.setDisplayNamePrefix()` - Add spacing while preserving original names
- `api.getPlayerByName()` - Access player information
- `api.clearAllDisplayNames()` - Clean removal of all modifications

### Event Handlers
- **Chat Events**: Detects `/who` command execution patterns
- **Player Join**: Auto-realigns when new players enter the game
- **Respawn Events**: Clears alignment when changing servers/respawning  
- **Player Info Updates**: Handles TAB list changes after `/who`

### Safety Features
- Only modifies display names through safe Starfish API methods
- Preserves all original player information (ranks, stats, colors)
- Automatic cleanup on respawn/server changes
- No interference with other plugins using display names

## Compatibility

- **Minecraft Version**: 1.8.9 (Starfish Proxy requirement)
- **Server**: Hypixel Network (designed for Hypixel's `/who` command)
- **Starfish Proxy**: Tested with v0.1.7a+
- **Other Plugins**: Compatible with existing plugins (uses unique prefixes)

## Troubleshooting

### Plugin Not Loading
```
Error: Plugin aubtabalign initialization failed
```
- Ensure file is named correctly: `aubtabalign-1-0-0.js`
- Check that Starfish Proxy has proper permissions to read the file
- Restart Starfish Proxy completely

### Commands Not Working
- Make sure plugin is enabled: `/aubtabalign toggle`
- Check plugin loaded: `/proxy plugins` should show "AubTabAlign"
- Verify you're using correct command format: `/aubtabalign <command>`

### Alignment Not Applying
- Ensure you've executed `/who` command first
- Check plugin is enabled in configuration
- Try manual realignment: `/aubtabalign realign`
- Verify you're in a game lobby (not main Hypixel lobby)

### Alignment Persisting
- Use `/aubtabalign clear` to remove all spacing
- Disable plugin: `/aubtabalign toggle` 
- Restart Starfish Proxy to reset all display names

## Examples

### Basic Usage
1. Connect to Hypixel through Starfish Proxy
2. Join a game lobby (Bedwars, Skywars, etc.)
3. Execute `/who` command in chat
4. TAB list will automatically gain spacing/indentation
5. New players joining will also be aligned

### Configuration Example
```
Plugin Settings:
- Enabled: ON
- Spaces Count: 6 spaces  
- Auto Realign on Join: ON
- Auto Realign on Respawn: OFF
```

### Command Examples
```
/aubtabalign toggle          → Plugin disabled and alignment cleared
/aubtabalign config          → Opens configuration UI
/aubtabalign realign         → TAB list realigned!
/aubtabalign clear           → All TAB list alignment cleared
```

## Version History

### v1.0.0
- Initial release
- Core alignment functionality after `/who` command
- Toggle and configuration commands  
- Configurable spacing options (2-10 spaces)
- Auto-realignment on player join/respawn
- Manual realign and clear commands
- Full compatibility with Starfish Proxy display name system

## Support

For issues, suggestions, or contributions:
- Check Starfish Proxy documentation
- Verify all requirements are met
- Test with other plugins disabled to isolate issues
- Report bugs with specific error messages and reproduction steps

## License

This plugin follows the same license as Starfish Proxy (UNLICENSED).