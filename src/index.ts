import express from 'express';
import http from 'http';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

interface Invitation {
  code: string;
  type: number;
  expires_at: string;
  guild: {
    id: string;
    name: string;
    splash: string | null;
    banner: string | null;
    description: string | null;
    icon: string | null;
    features: string[];
    verification_level: number;
    vanity_url_code: string | null;
    premium_subscription_count: number;
    nsfw: boolean;
    nsfw_level: number;
  };
  channel: {
    id: string;
    name: string;
    type: number;
  };
  inviter: {
    id: string;
    username: string;
    global_name: string | null;
    avatar: string;
    discriminator: string;
    public_flags: number;
    bot: boolean;
    avatar_decoration: string | null;
  };
  uses: number;
  max_uses: number;
  max_age: number;
  temporary: boolean;
  created_at: string;
}
httpServer.listen(8080);

app.get('/', async (req, res) => {
    const data : Invitation = await fetch(`https://discord.com/api/v10/channels/${process.env.CHANNEL_ID}/invites`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${process.env.TOKEN}`
        },
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 1
        }),
        method: 'POST',
    }).then(data => data.json());
    if(data.code){
        return res.redirect('https://discord.gg/' + data.code);
    }else{
        return res.status(500).json({_error: 'Server error', status: 500});
    }
});

