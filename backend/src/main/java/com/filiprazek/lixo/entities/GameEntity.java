package com.filiprazek.lixo.entities;

public class GameEntity {
    public String id;
    public int board;
    public int colorToPlay;
    public boolean isWon;

    public GameEntity(String id, int board, int colorToPlay, boolean isWon) {
        this.id = id;
        this.board = board;
        this.colorToPlay = colorToPlay;
        this.isWon = isWon;
    }
}
