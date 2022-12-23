package com.filiprazek.lixo.service;

import com.filiprazek.lixo.data.Game;
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

    public Game findById(String id) {
        return gameRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Game save(Game game) {
        return gameRepository.save(game);
    }

    public Game newGame() {
        return gameRepository.save(new Game());
    }

    public Game move(String id, int move) {
        Game game = this.findById(id);
        int board = game.getBoard();

        List<Integer> cellValues = new ArrayList<>();
        int totalCellValue = 0;

        for (int cell = 0; cell < 9; cell++) {
            // Cell value is given by the ternary decomposition of board
            int cellValue = (int) Math.floor(board / Math.pow(3, cell)) % 3;
            cellValues.add(cellValue);
            totalCellValue += cellValue;
        }

        // First player is 1, then 2
        int player = totalCellValue % 3 == 0 ? 1 : 2;
        int otherPlayer = 3 - player;
        boolean isGameWon = this.checkWin(cellValues, otherPlayer);
        boolean moveCanBePlayed = cellValues.get(move) == 0;
        if (isGameWon || !moveCanBePlayed) {
            throw new InvalidMoveException();
        }
        int newBoard = board + player * (int) Math.pow(3, move);

        game.setBoard(newBoard);
        return gameRepository.save(game);
    }
}
