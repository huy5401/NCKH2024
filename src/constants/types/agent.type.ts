export type AgentType = {
    id?: number,
    Port?: string,
    ServerName?: string,
    ProxyPreserveHost?: string,
    ProxyPass?: string,
    ProxyPassReverse?: string,
    ErrorLog?: string,
    ErrorDocument?: string,
    Protocol?: string,
    SecRuleEngine?: string,
    SSLCertificateFile?: string | null,
    SSLCertificateKeyFile?: string | null,
    SSLEngine?: string | null,
    SSLProxyEngine?: string | null
};

export type FilterAgentType = {
    filters?: string
}
