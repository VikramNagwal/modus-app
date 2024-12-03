import { password } from 'bun';
class SanatizeData {

    name?: string;
    password: string;
    email: string;

    constructor(password: string, email: string, name?: string) {
        this.name = name;
        this.password = password;
        this.email = email;
    }

    async hashPassword() {
        this.password = await password.hash(this.password);
        return this.password;
    }

    async verifyPassword() {
        return password.verify(this.password, this.password);
    }

    lowerCase() {
        const regex = /(?:')|(?:--)|(?:#)|(?:;)|(?:\b(?:SELECT|INSERT|DELETE|UPDATE|DROP|--|OR|AND|UNION)\b)/;

        if(this.name && regex.test(this.name)) {
            this.name.replaceAll(regex, '-');
        }
        return this.name ? this.name.toLowerCase() : '';
    }
}

export {
    SanatizeData
}