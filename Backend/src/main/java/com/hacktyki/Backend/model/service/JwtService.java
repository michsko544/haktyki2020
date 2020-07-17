package com.hacktyki.Backend.model.service;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private String apiKey = "EkW36ZMJNPlBsDeJf7VGNYbi1PSIQrL2POmmiezlICCGQaSvN-wcDsIpMycslFJ3R2thY4-io6aGb7NCAC5HQQ";
    private SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    public String createJwt(String userLogin){

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        Date expirationTime = new Date(nowMillis + (1000 * 60)); // 1 min

        JwtBuilder builder = Jwts.builder()
                .setSubject(userLogin)
                .claim("roles", "USER")
                .setIssuedAt(now)
                .setExpiration(expirationTime)
                .signWith(getSigningKey(),signatureAlgorithm);

        return builder.compact();
    }

    public Key getSigningKey(){
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(apiKey);
        return new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
    }

}
