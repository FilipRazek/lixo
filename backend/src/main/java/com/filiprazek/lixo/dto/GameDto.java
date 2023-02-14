package com.filiprazek.lixo.dto;

public class GameDto {
    public String id;
    public int board;
    public int colorToPlay;
    public boolean isWon;
    public boolean joinable;

    public GameDto(String id, int board, int colorToPlay, boolean isWon, boolean joinable) {
        this.id = id;
        this.board = board;
        this.colorToPlay = colorToPlay;
        this.isWon = isWon;
        this.joinable = joinable;
    }
}
