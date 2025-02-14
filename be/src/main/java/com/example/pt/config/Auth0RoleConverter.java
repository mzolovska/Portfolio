package com.example.pt.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Collection;
import java.util.stream.Collectors;

public class Auth0RoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        var roles = (Collection<String>) jwt.getClaims().getOrDefault("permissions", java.util.Collections.emptyList());

        return roles.stream()
                .map(role -> (GrantedAuthority) () -> "SCOPE_" + role)
                .collect(Collectors.toList());
    }
}
