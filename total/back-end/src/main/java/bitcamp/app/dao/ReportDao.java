package bitcamp.app.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.app.vo.Report;

@Mapper
public interface ReportDao {
  List<Report> findReportType();
}
