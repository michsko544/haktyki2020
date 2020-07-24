package com.hacktyki.Backend.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import static com.hacktyki.Backend.security.SecurityConstants.LOG_IN_URL;
import static com.hacktyki.Backend.security.SecurityConstants.SING_UP_URL;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers(HttpMethod.POST,
     LOG_IN_URL,
                SING_UP_URL,
                "/v2/api-docs",
                "/configuration/ui",
                "/swagger-resources/**",
                "/configuration/security",
                "/swagger-ui.html",
                "/webjars/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .antMatcher("/users/**")
            .addFilter(new JwtFilter(authenticationManager()))
            .csrf().disable()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }
}
