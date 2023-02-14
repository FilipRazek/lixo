package com.filiprazek.lixo.dto;

public class AuthGameDto extends GameDto {
    public String token;
    public int color;

    public AuthGameDto(String id, int board, int colorToPlay, boolean isWon, boolean joinable, String token, int color) {
        super(id, board, colorToPlay, isWon, joinable);
        this.token = token;
        this.color = color;
    }
}
