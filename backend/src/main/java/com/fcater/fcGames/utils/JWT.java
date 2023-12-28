package com.fcater.fcGames.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class JWT {
    private static final short EXPIRE_DAYS = 1;

    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public static String generateToken(String string) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + TimeUnit.DAYS.toMillis(EXPIRE_DAYS));
        return Jwts.builder()
                .setSubject(string)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SECRET_KEY)
                .compact();
    }

    public static boolean isValidJWT(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
