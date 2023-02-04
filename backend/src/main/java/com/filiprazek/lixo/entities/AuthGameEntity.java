package com.filiprazek.lixo.entities;

public class AuthGameEntity extends GameEntity {
    public String token;
    public int color;

    public AuthGameEntity(String id, int board, int colorToPlay, boolean isWon, String token, int color) {
        super(id, board, colorToPlay, isWon);
        this.token = token;
        this.color = color;
    }
}
