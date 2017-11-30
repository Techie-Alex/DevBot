const {
    ShardingManager
} = require('discord.js');
const manager = new ShardingManager("./main.js", {
    totalShards: 8
});
manager.spawn();
