# AubTabAlign Plugin - Alignment Fix Guide

## Issue Fixed: Improved TAB List Alignment

The plugin has been updated to provide better TAB list alignment with multiple methods to handle different alignment needs.

## New Configuration Options

### Alignment Method
You can now choose how the spacing is applied:

1. **Prefix (before name)** - Default method
   - Adds spaces before the player name
   - Best for: Small spacing (2-4 spaces)
   - Effect: Name shifts right, stats remain in place

2. **Suffix (after stats)** - New method  
   - Adds spaces after the player's stats/information
   - Best for: Larger spacing (6-10 spaces)
   - Effect: Entire TAB entry gets padding

3. **Auto (smart choice)** - Recommended
   - Uses prefix for 2-4 spaces
   - Uses suffix for 6-10 spaces
   - Automatically chooses the best method

## How to Configure

1. Connect to Hypixel through Starfish Proxy
2. Use `/aubtabalign config` to open settings
3. Set your preferences:
   - **Spaces Count**: Choose 2, 4, 6, 8, or 10 spaces
   - **Alignment Method**: Choose prefix, suffix, or auto
   - **Auto Options**: Enable/disable auto-realignment

## Testing Different Methods

Try these configurations to find what works best:

### For Subtle Alignment (Recommended)
```
Spaces Count: 4 spaces
Alignment Method: Prefix (before name)
```

### For Pronounced Alignment
```
Spaces Count: 8 spaces  
Alignment Method: Suffix (after stats)
```

### For Automatic Best Choice
```
Spaces Count: 6 spaces
Alignment Method: Auto (smart choice)
```

## Commands for Testing

1. `/aubtabalign toggle` - Enable/disable plugin
2. `/aubtabalign config` - Open configuration
3. `/aubtabalign realign` - Test alignment immediately  
4. `/aubtabalign clear` - Remove all alignment

## Usage Instructions

1. Join a Hypixel game (Bedwars, Skywars, etc.)
2. Execute `/who` in chat
3. TAB list will automatically align based on your settings
4. Use `/aubtabalign realign` to manually trigger alignment
5. Adjust settings with `/aubtabalign config` if needed

## Troubleshooting Alignment Issues

### If names look weird or too spaced:
- Try **Prefix method** with **4 spaces**
- Or use **Auto method** with **6 spaces**

### If stats aren't aligned properly:
- Try **Suffix method** with **6-8 spaces**
- Or switch to **Auto method**

### If alignment seems inconsistent:
- Use `/aubtabalign clear` to reset
- Change configuration and use `/aubtabalign realign`
- Make sure you've executed `/who` first

## Best Practices

1. **Start with Auto method** - It's designed to choose the best approach
2. **Test in different game modes** - Alignment may vary by game type
3. **Use /realign command** - After changing settings to test immediately
4. **Clear before major changes** - Reset alignment when switching methods

The plugin now provides much more control over how TAB alignment works, allowing you to find the perfect setup for your preferences!