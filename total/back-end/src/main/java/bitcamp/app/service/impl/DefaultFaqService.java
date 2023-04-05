package bitcamp.app.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.app.dao.FaqDao;
import bitcamp.app.service.FaqService;
import bitcamp.app.vo.Faq;

@Service
public class DefaultFaqService implements FaqService{

  @Autowired private FaqDao faqDao;

  @Override
  public List<Faq> findFaqType() {
    return faqDao.findFaqType();
  }

}