import { password } from 'bun';

enum Role {
    ADMIN = 'admin',
    USER = 'user'
}
class SanatizeData {
    private name?: string;
    private password: string;
    private email: string;
    private role: Role;

    constructor(password: string, email: string, name?: string, role = 'user') {
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role === 'admin' ? Role.ADMIN : Role.USER;
    }

    async hashPassword(): Promise<string> {
        return await password.hash(this.password);
    }

    async verifyPassword(hashedPassword: string): Promise<boolean> {
        return await password.verify(this.password, hashedPassword);
    }

    sanitizeEmail(): string {
        // Basic email validation and sanitization
        const normalizedEmail = this.email.toLowerCase().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return emailRegex.test(normalizedEmail) ? normalizedEmail : '';
    }

    getEmail(): string {
        return this.sanitizeEmail();
    }
}

export { SanatizeData };