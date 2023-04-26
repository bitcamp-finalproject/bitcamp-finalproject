package bitcamp.app.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController implements ErrorController  {

  @GetMapping({ "/", "/error" })
  public String index() {
    return "index";
  }

  public String getErrorPath() {
    return "/error";
  }
}