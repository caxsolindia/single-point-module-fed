declare namespace NodeJS {
    interface ProcessEnv {
        BASE_URL?: string;
        AUTHAPP_REMOTE_ENTRY?: string;
        STYLEGUIDE_REMOTE_ENTRY?: string;
        USER_PROFILE_REMOTE_ENTRY?: string;
        // Add other variables as needed
    }
}
