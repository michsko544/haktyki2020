package com.hacktyki.Backend;

import com.hacktyki.Backend.model.service.JwtService;
import com.hacktyki.Backend.utils.JwtFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers(HttpMethod.POST, "/login","/register").permitAll()
            .anyRequest().authenticated()
            .and()
                .antMatcher("/users/**")
            .addFilter(new JwtFilter(authenticationManager(), new JwtService()))
            .csrf().disable();
    }

}

