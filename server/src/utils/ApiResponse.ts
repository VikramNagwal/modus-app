class ApiResponse {
    public statusCode: number;
    public message: string;
    public data: any;
    public success: boolean;


    constructor(statusCode: number, message: string, data: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = true;
    }
}

export {
    ApiResponse
}