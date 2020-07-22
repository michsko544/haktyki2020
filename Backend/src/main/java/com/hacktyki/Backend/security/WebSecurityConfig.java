package com.hacktyki.Backend.security;

import com.hacktyki.Backend.model.service.JwtService;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import static com.hacktyki.Backend.security.SecurityConstants.LOG_IN_URL;
import static com.hacktyki.Backend.security.SecurityConstants.SING_UP_URL;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers(HttpMethod.POST, LOG_IN_URL, SING_UP_URL).permitAll()
            .anyRequest().authenticated()
            .and()
            .antMatcher("/users/**")
            .addFilter(new JwtFilter(authenticationManager()))
            .csrf().disable();
    }

}

