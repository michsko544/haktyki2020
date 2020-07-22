package com.hacktyki.Backend.security;

import com.hacktyki.Backend.model.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Set;

import static com.hacktyki.Backend.security.SecurityConstants.HEADER_STRING;
import static com.hacktyki.Backend.security.SecurityConstants.TOKEN_PREFIX;

public class JwtFilter extends BasicAuthenticationFilter {

    private JwtService jwtService;

    public JwtFilter(AuthenticationManager authenticationManager, JwtService jwtService) {
        super(authenticationManager);
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(HEADER_STRING);

        if(header == null || !header.startsWith(TOKEN_PREFIX)){
            chain.doFilter(request,response);
            return;
        }

        UsernamePasswordAuthenticationToken authResult = getAuthenticationByToken(header);
        SecurityContextHolder.getContext().setAuthentication(authResult);
        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthenticationByToken(String header) {

        if(header != null) {
            try {
                Jws<Claims> claimsJws = Jwts.parserBuilder()
                                            .setSigningKey(jwtService.getSigningKey())
                                            .build()
                                            .parseClaimsJws(header.replace(TOKEN_PREFIX, ""));

                String username = claimsJws.getBody().get("sub").toString();
                String role = claimsJws.getBody().get("roles").toString();
                Set<SimpleGrantedAuthority> simpleGrantedAuthorities = Collections.singleton(new SimpleGrantedAuthority((role)));

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                        = new UsernamePasswordAuthenticationToken(username, null, simpleGrantedAuthorities);

                return usernamePasswordAuthenticationToken;
            }
            catch (JwtException e){
                return null;
            }
            catch (Exception e){
                System.out.println("JWT FILTER UNEXPECTED ERROR! - EXCEPTION MESSAGE: " + e.getMessage());
                return null;
            }
        }
        return null;
    }
}
