import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '@app/contracts';
import axios from 'axios';

@Injectable()
export class AuthService {
    // private readonly googleClientId = process.env.GOOGLE_CLIENT_ID;
    // private readonly googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    // private readonly googleRedirectUri = process.env.GOOGLE_REDIRECT_URI;
    
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async validateUser(username: string, password: string): Promise<UserDto> {
        const user = await this.usersRepository.findOne({ where: { username } });
        if (!user) return null;

        // Compare the provided password with the stored hash
        //return await bcrypt.compare(password, user.password_hash);
        if (password === user.password) {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
            } as UserDto;
        }
        return null;
    }

    async findUser(username: string): Promise<{ id: String}> {
        const user = await this.usersRepository.findOne({ where: { username } });
        if (!user) return null;
        return { id: user.id.toString() };
    }

    // async getGoogleAuthUrl(): Promise<string> {
    //     const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    //     const scope = 'https://www.googleapis.com/auth/calendar.events';
    //     const params = new URLSearchParams({
    //         client_id: this.googleClientId,
    //         redirect_uri: this.googleRedirectUri,
    //         response_type: 'code',
    //         scope,
    //         access_type: 'offline',
    //     });

    //     return `${baseUrl}?${params.toString()}`;
    // }

    // async exchangeCodeForTokens(code: string): Promise<{ accessToken: string; refreshToken: string }> {
    //     const tokenUrl = 'https://oauth2.googleapis.com/token';
    //     const data = {
    //         code,
    //         client_id: this.googleClientId,
    //         client_secret: this.googleClientSecret,
    //         redirect_uri: this.googleRedirectUri,
    //         grant_type: 'authorization_code',
    //     };

    //     const response = await axios.post(tokenUrl, new URLSearchParams(data), {
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //     });

    //     const { access_token, refresh_token } = response.data;

    //     // Możesz zapisać te dane do bazy danych powiązane z użytkownikiem
    //     return { accessToken: access_token, refreshToken: refresh_token };
    // }
}
