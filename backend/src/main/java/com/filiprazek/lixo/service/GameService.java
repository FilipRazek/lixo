package com.filiprazek.lixo.service;

import com.filiprazek.lixo.data.Game;
import com.filiprazek.lixo.entities.GameEntity;
import com.filiprazek.lixo.exception.EntityNotFoundException;
import com.filiprazek.lixo.exception.InvalidMoveException;
import com.filiprazek.lixo.repository.GameRepository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    private List<Integer> getCellValues(int board) {
        List<Integer> cellValues = new ArrayList<>();

        for (int cell = 0; cell < 9; cell++) {
            // Cell value is given by the ternary decomposition of board
            int cellValue = (int) Math.floor(board / Math.pow(3, cell)) % 3;
            cellValues.add(cellValue);
        }
        return cellValues;
    }

    private int getPlayerFromCellValues(List<Integer> cellValues) {
        int totalCellValue = 0;
        for (int value : cellValues) {
            totalCellValue += value;
        }
        // First player is 1, then 2
        return totalCellValue % 3 == 0 ? 1 : 2;
    }

    /**
     * Check if a player has won on a tic-tac-toe board.
     * 
     * @author ChatGPT (OpenAI)
     */
    private boolean checkWin(List<Integer> cellValues, int player) {
        int[][] winningTriplets = { { 0, 1, 2 }, { 3, 4, 5 }, { 6, 7, 8 }, { 0, 3, 6 }, { 1, 4, 7 }, { 2, 5, 8 },
                { 0, 4, 8 }, { 2, 4, 6 } };

        // Check for winning patterns
        for (int[] triplet : winningTriplets) {
            if (cellValues.get(triplet[0]) == player && cellValues.get(triplet[1]) == player
                    && cellValues.get(triplet[2]) == player)
                return true;
        }

        // No winning pattern found
        return false;
    }

    private Game findById(String id) {
        return gameRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<String> getAllIds() {
        List<Game> allGames = gameRepository.findAll();
        List<String> allGameIds = new ArrayList<>();

        for (Game game : allGames) {
            allGameIds.add(game.getId());
        }

        return allGameIds;
    }

    public GameEntity findEntityById(String id) {
        Game game = this.findById(id);
        List<Integer> cellValues = this.getCellValues(game.getBoard());
        int player = this.getPlayerFromCellValues(cellValues);
        int otherPlayer = 3 - player;
        boolean isWon = this.checkWin(cellValues, otherPlayer);
        return new GameEntity(game.getId(), game.getBoard(), player, isWon);
    }

    public Game newGame() {
        return gameRepository.save(new Game());
    }

    public GameEntity move(String id, int move) {
        Game game = this.findById(id);
        List<Integer> cellValues = this.getCellValues(game.getBoard());
        int player = this.getPlayerFromCellValues(cellValues);
        int otherPlayer = 3 - player;
        boolean isGameWon = this.checkWin(cellValues, otherPlayer);

        boolean moveCanBePlayed = cellValues.get(move) == 0;
        if (isGameWon || !moveCanBePlayed) {
            throw new InvalidMoveException();
        }
        int newBoard = game.getBoard() + player * (int) Math.pow(3, move);

        game.setBoard(newBoard);
        gameRepository.save(game);

        return new GameEntity(game.getId(), newBoard, player, isGameWon);
    }
}
