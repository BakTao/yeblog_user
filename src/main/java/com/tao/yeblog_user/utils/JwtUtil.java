package com.tao.yeblog_user.utils;

import io.jsonwebtoken.*;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
@Data
public class JwtUtil {

    @Value("${jwt.config.key}")
    private String key;

    @Value("${jwt.config.ttl}")
    private Long ttl;

    public String getToken(String id, String name, Map<String, Object> map){
        long now = System.currentTimeMillis();

        long exp = now + ttl;

        JwtBuilder jwtBuilder = Jwts.builder()
                .setId(id)
                .setSubject(name)
                .setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256, key);

        for(Map.Entry<String, Object> entry : map.entrySet()){
            jwtBuilder.claim(entry.getKey(), entry.getValue());
        }
        jwtBuilder.setExpiration(new Date(exp));

        return jwtBuilder.compact();
    }

    public Claims parseToken(String token) throws ExpiredJwtException{
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
    }
}
