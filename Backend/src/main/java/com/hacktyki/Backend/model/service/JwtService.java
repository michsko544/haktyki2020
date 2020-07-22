package com.hacktyki.Backend.model.service;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

import static com.hacktyki.Backend.security.SecurityConstants.SECRET;
import static com.hacktyki.Backend.security.SecurityConstants.SIGNATURE_ALGORITHM;
import static com.hacktyki.Backend.security.SecurityConstants.EXPIRATION_TIME;

@Service
public class JwtService {

    public JwtService() {
    }

    public String createJwt(String userLogin){

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        Date expirationTime = new Date(nowMillis + EXPIRATION_TIME);

        JwtBuilder builder = Jwts.builder()
                .setSubject(userLogin)
                .claim("roles", "USER")
                .setIssuedAt(now)
                .setExpiration(expirationTime)
                .signWith(getSigningKey(),SIGNATURE_ALGORITHM);

        return builder.compact();
    }

    public Key getSigningKey(){
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET);
        return new SecretKeySpec(apiKeySecretBytes, SIGNATURE_ALGORITHM.getJcaName());
    }

}
