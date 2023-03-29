package bitcamp.app.service;

import java.util.List;
import bitcamp.app.vo.Board;

public interface BoardService {
  void add(Board board);
  List<Board> list(String keyword);
  void update(Board board);
  void delete(int no);
}