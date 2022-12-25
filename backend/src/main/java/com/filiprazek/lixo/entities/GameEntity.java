package com.filiprazek.lixo.entities;

public class GameEntity {
    public String id;
    public int board;
    public int player;
    public boolean isWon;

    public GameEntity(String id, int board, int player, boolean isWon) {
        this.id = id;
        this.board = board;
        this.player = player;
        this.isWon = isWon;
    }
}
