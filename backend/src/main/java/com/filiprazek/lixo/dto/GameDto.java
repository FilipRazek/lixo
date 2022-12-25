package com.filiprazek.lixo.dto;

public class GameDto {
    public String id;
    public int board;
    public int player;
    public boolean isWon;

    public GameDto(String id, int board, int player, boolean isWon) {
        this.id = id;
        this.board = board;
        this.player = player;
        this.isWon = isWon;
    }
}
