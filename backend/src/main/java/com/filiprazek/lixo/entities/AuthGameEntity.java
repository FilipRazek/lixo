package com.filiprazek.lixo.entities;

public class AuthGameEntity extends GameEntity {
    public String token;
    public int color;

    public AuthGameEntity(String id, int board, int colorToPlay, boolean isWon, boolean joinable, String token, int color) {
        super(id, board, colorToPlay, isWon, joinable);
        this.token = token;
        this.color = color;
    }
}
