
package bitcamp.app.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.app.dao.MemberDao;
import bitcamp.app.service.MemberService;
import bitcamp.app.vo.Member;

@Service
public class DefaultMemberService implements MemberService{

  @Autowired private MemberDao memberDao;

  @Transactional
  @Override
  public void add(Member member) {
    memberDao.insert(member);
  }

  @Override
  public List<Member> list(String keyword) {
    return memberDao.findAll();
  }

  @Override
  public Member get(String email, String password) {
    Map<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);

    return memberDao.findByEmailAndPassword(paramMap);
  }

  @Override
  public void update(Member member) {

  }

  @Override
  public void delete(int no) {

  }
  @Override
  public Member get(int no) {
    System.out.println(no);
    Member m = memberDao.findByNo(no);
    System.out.println(m);
    return m;
  }




}
