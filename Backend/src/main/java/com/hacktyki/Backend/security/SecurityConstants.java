package com.hacktyki.Backend.security;

import io.jsonwebtoken.SignatureAlgorithm;

public class SecurityConstants {
    public static final String SECRET = "EkW36ZMJNPlBsDeJf7VGNYbi1PSIQrL2POmmiezlICCGQaSvN-wcDsIpMycslFJ3R2thY4-io6aGb7NCAC5HQQ";
    public static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;
    public static final long EXPIRATION_TIME = 43_200_000; // 12 hours
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String LOG_IN_URL = "/login";
    public static final String SING_UP_URL = "/register";
}
