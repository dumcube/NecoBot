const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const OWNER_ID = '540438259436748811';
const GDBROWSER_API = 'https://gdbrowser.com/api/profile/';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription("(DUM ONLY) neco tells you stats of a GD player")
    .setContexts(0, 1, 2)

    .addStringOption(option =>
      option.setName('player')
        .setDescription('GD username')
        .setRequired(true)
    ),

  async execute(interaction) {
    if (interaction.user.id !== OWNER_ID) {
      return await interaction.reply({
        content: 'this command is restricted to DUM',
        ephemeral: true
      });
    }

// this is to know what trophy to use based on rank

  function getTrophyEmoji(rank) {
    if (rank === "N/A") return "<:x_:1439930261553811488>"; // default for no rank

    const r = Number(rank);
    if (isNaN(r)) return "<:trophyRed:1439927578751406100>";

    if (r <= 10)   return "<:trophyGold:1439924588241879155>";
    if (r <= 50)   return "<:trophySilver:1439927579909034035>";
    if (r <= 100)  return "<:trophyBronze:1439927529090580490>";
    if (r <= 200)  return "<:trophyGreen:1439927576624631938>";
    if (r <= 500)  return "<:trophyBlue:1439927527920500768>";
    if (r <= 1000) return "<:trophyPink:1439927577853825167>";

    return "<:trophyRed:1439927578751406100>"; // everyone else
  }


    const player = interaction.options.getString('player');
    await interaction.deferReply();

    try {
      const res = await axios.get(`${GDBROWSER_API}${encodeURIComponent(player)}`);

      // if player doesn't exist we return "invalid user"
      if (!res.data || res.data.error) {
        return await interaction.editReply("invalid user");
      }

      const stats = {
        stars: res.data.stars ?? 'unknown',
        moons: res.data.moons ?? 'unknown',
        demons: res.data.demons ?? 'unknown',
        coins: res.data.coins ?? 'unknown',
        creatorPoints: res.data.cp ?? 'unknown',
        userCoins: res.data.userCoins ?? 'unknown',
        globalRank: (res.data.rank && res.data.rank !== "0") ? res.data.rank : "N/A"
      };

      const trophy = getTrophyEmoji(stats.globalRank);

      const embed = new EmbedBuilder()
        .setTitle(`${player}'s Stats`)
        .setURL(`https://gdbrowser.com/profile/${encodeURIComponent(player)}`)
        .setColor(0xD40000)
        .addFields(
          { name: 'Stars', value: `${stats.stars} <:star:1439028519983251578>`, inline: true },
          { name: 'Moons', value: `${stats.moons} <:moon:1439028570042273895>`, inline: true },
          { name: 'Demons', value: `${stats.demons} <:demon:1439028585531965581>`, inline: true },
          { name: 'Coins', value: `${stats.userCoins} <:coin:1439028617538568273>`, inline: true },
          { name: 'Creator Points', value: `${stats.creatorPoints} <:crp:1439028601185108180>`, inline: true },
          { name: 'Global Rank', value: `${stats.globalRank} ${trophy}`, inline: true },

        )
        .setFooter({ text: 'Stats fetched from gdbrowser.com' });


      await interaction.editReply({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      await interaction.editReply("⚠️ **This user does not exist** ⚠️");
    }
  }
};
