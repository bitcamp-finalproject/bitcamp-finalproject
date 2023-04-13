# _작업내용 및 시행착오 기록_

# 3월29일 수

## 작업내용

### 1. java Member 객체 birthDate (Date)과 DB 의 birth_dt (CHAR(6)) 타입 달라 java Member 객체 String 타입으로 수정

### 2. 로그인/로그아웃 DB 로 데이터 요청 및 응답 받는것 진행 완료

## 시행착오

### 1. resultType="member" == resultMap="memberMap"

Mapper 파일에서 위 둘은 동일하다. 위에 다음과 같이 설정했기 때문이다.

```HTML
<resultMap type="member" id="memberMap">
```

그래서 아래처럼 사용할 수 있다.

```HTML
<select id="findByEmail" parameterType="String" resultType="member"> <!-- resultMap="memberMap" 과 동일 -->
```

### 2. NotSerializableException

App.java 실행시 이런 오류가 떴다.  
NotSerializableException 이 눈에 띈다.  
찾아보니 객체를 byte stream 으로 변환할때 Serializable 선언을 하지 않아서이다.  
Member.java 클래스에 implemets Serializable 붙이니 해결된다.  
원래 안붙여도 에러 발생하지 않아야 하지만 버그로 인해 발생하는 것 같다.  
에러가 떴다가 안떴다가 한다.

```bash
.   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.0.5)

2023-03-29T17:05:54.591+09:00  INFO 13796 --- [  restartedMain] bitcamp.app.App                          : Starting App using Java 17.0.5 with PID 13796 (C:\Users\bitcamp\git\bitcamp-finalproject\total\final\bin\main started by bitcamp in C:\Users\bitcamp\git\bitcamp-finalproject\total\final)
2023-03-29T17:05:54.591+09:00  INFO 13796 --- [  restartedMain] bitcamp.app.App                          : No active profile set, falling back to 1 default profile: "default"
2023-03-29T17:05:54.761+09:00  WARN 13796 --- [  restartedMain] io.undertow.websockets.jsr               : UT026010: Buffer pool was not set on WebSocketDeploymentInfo, the default pool will be used
2023-03-29T17:05:54.762+09:00  INFO 13796 --- [  restartedMain] io.undertow.servlet                      : Initializing Spring embedded WebApplicationContext
2023-03-29T17:05:54.762+09:00  INFO 13796 --- [  restartedMain] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 169 ms
2023-03-29T17:05:54.870+09:00  INFO 13796 --- [  restartedMain] o.s.b.d.a.OptionalLiveReloadServer       : LiveReload server is running on port 35729
2023-03-29T17:05:54.877+09:00  WARN 13796 --- [  restartedMain] io.undertow.servlet                      : UT015008: Failed to load development mode persistent sessions

java.io.WriteAbortedException: writing aborted; java.io.NotSerializableException: bitcamp.app.vo.Member
	at java.base/java.io.ObjectInputStream.readObject0(ObjectInputStream.java:1751) ~[na:na]
	at java.base/java.io.ObjectInputStream.readObject(ObjectInputStream.java:514) ~[na:na]
	at java.base/java.io.ObjectInputStream.readObject(ObjectInputStream.java:472) ~[na:na]
	at java.base/java.util.HashMap.readObject(HashMap.java:1552) ~[na:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77) ~[na:na]
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:na]
	at java.base/java.lang.reflect.Method.invoke(Method.java:568) ~[na:na]
	at java.base/java.io.ObjectStreamClass.invokeReadObject(ObjectStreamClass.java:1231) ~[na:na]
	at java.base/java.io.ObjectInputStream.readSerialData(ObjectInputStream.java:2434) ~[na:na]
	at java.base/java.io.ObjectInputStream.readOrdinaryObject(ObjectInputStream.java:2268) ~[na:na]
	at java.base/java.io.ObjectInputStream.readObject0(ObjectInputStream.java:1744) ~[na:na]
	at java.base/java.io.ObjectInputStream$FieldValues.<init>(ObjectInputStream.java:2617) ~[na:na]
	at java.base/java.io.ObjectInputStream.readSerialData(ObjectInputStream.java:2468) ~[na:na]
	at java.base/java.io.ObjectInputStream.readOrdinaryObject(ObjectInputStream.java:2268) ~[na:na]
	at java.base/java.io.ObjectInputStream.readObject0(ObjectInputStream.java:1744) ~[na:na]
	at java.base/java.io.ObjectInputStream.readObject(ObjectInputStream.java:514) ~[na:na]
	at java.base/java.io.ObjectInputStream.readObject(ObjectInputStream.java:472) ~[na:na]
	at java.base/java.util.HashMap.readObject(HashMap.java:1552) ~[na:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77) ~[na:na]
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:na]
	at java.base/java.lang.reflect.Method.invoke(Method.java:568) ~[na:na]
	at java.base/java.io.ObjectStreamClass.invokeReadObject(ObjectStreamClass.java:1231) ~[na:na]
	at java.base/java.io.ObjectInputStream.readSerialData(ObjectInputStream.java:2434) ~[na:na]
	at java.base/java.io.ObjectInputStream.readOrdinaryObject(ObjectInputStream.java:2268) ~[na:na]
	at java.base/java.io.ObjectInputStream.readObject0(ObjectInputStream.java:1744) ~[na:na]
	at java.base/java.io.ObjectInputStream.readObject(ObjectInputStream.java:514) ~[na:na]
	at java.base/java.io.ObjectInputStream.readObject(ObjectInputStream.java:472) ~[na:na]
	at org.springframework.boot.web.embedded.undertow.FileSessionPersistence.readSession(FileSessionPersistence.java:109) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.embedded.undertow.FileSessionPersistence.load(FileSessionPersistence.java:94) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.embedded.undertow.FileSessionPersistence.load(FileSessionPersistence.java:89) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.embedded.undertow.FileSessionPersistence.loadSessionAttributes(FileSessionPersistence.java:77) ~[spring-boot-3.0.5.jar:3.0.5]
	at io.undertow.servlet.handlers.SessionRestoringHandler.start(SessionRestoringHandler.java:74) ~[undertow-servlet-2.3.4.Final.jar:2.3.4.Final]
	at io.undertow.servlet.core.DeploymentManagerImpl$2.call(DeploymentManagerImpl.java:568) ~[undertow-servlet-2.3.4.Final.jar:2.3.4.Final]
	at io.undertow.servlet.core.DeploymentManagerImpl$2.call(DeploymentManagerImpl.java:559) ~[undertow-servlet-2.3.4.Final.jar:2.3.4.Final]
	at io.undertow.servlet.core.ServletRequestContextThreadSetupAction$1.call(ServletRequestContextThreadSetupAction.java:42) ~[undertow-servlet-2.3.4.Final.jar:2.3.4.Final]
	at io.undertow.servlet.core.ContextClassLoaderSetupAction$1.call(ContextClassLoaderSetupAction.java:43) ~[undertow-servlet-2.3.4.Final.jar:2.3.4.Final]
	at io.undertow.servlet.core.DeploymentManagerImpl.start(DeploymentManagerImpl.java:601) ~[undertow-servlet-2.3.4.Final.jar:2.3.4.Final]
	at org.springframework.boot.web.embedded.undertow.DeploymentManagerHttpHandlerFactory$DeploymentManagerHandler.<init>(DeploymentManagerHttpHandlerFactory.java:65) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.embedded.undertow.DeploymentManagerHttpHandlerFactory.getHandler(DeploymentManagerHttpHandlerFactory.java:46) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.embedded.undertow.UndertowWebServer.createHttpHandler(UndertowWebServer.java:172) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.embedded.undertow.UndertowServletWebServer.createHttpHandler(UndertowServletWebServer.java:72) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.embedded.undertow.UndertowWebServer.createUndertowServer(UndertowWebServer.java:164) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.embedded.undertow.UndertowWebServer.start(UndertowWebServer.java:116) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.servlet.context.WebServerStartStopLifecycle.start(WebServerStartStopLifecycle.java:44) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.context.support.DefaultLifecycleProcessor.doStart(DefaultLifecycleProcessor.java:178) ~[spring-context-6.0.7.jar:6.0.7]
	at org.springframework.context.support.DefaultLifecycleProcessor$LifecycleGroup.start(DefaultLifecycleProcessor.java:356) ~[spring-context-6.0.7.jar:6.0.7]
	at java.base/java.lang.Iterable.forEach(Iterable.java:75) ~[na:na]
	at org.springframework.context.support.DefaultLifecycleProcessor.startBeans(DefaultLifecycleProcessor.java:155) ~[spring-context-6.0.7.jar:6.0.7]
	at org.springframework.context.support.DefaultLifecycleProcessor.onRefresh(DefaultLifecycleProcessor.java:123) ~[spring-context-6.0.7.jar:6.0.7]
	at org.springframework.context.support.AbstractApplicationContext.finishRefresh(AbstractApplicationContext.java:934) ~[spring-context-6.0.7.jar:6.0.7]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:587) ~[spring-context-6.0.7.jar:6.0.7]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:732) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:434) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:310) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1304) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1293) ~[spring-boot-3.0.5.jar:3.0.5]
	at bitcamp.app.App.main(App.java:15) ~[main/:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77) ~[na:na]
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:na]
	at java.base/java.lang.reflect.Method.invoke(Method.java:568) ~[na:na]
	at org.springframework.boot.devtools.restart.RestartLauncher.run(RestartLauncher.java:49) ~[spring-boot-devtools-3.0.5.jar:3.0.5]
Caused by: java.io.NotSerializableException: bitcamp.app.vo.Member
	at java.base/java.io.ObjectOutputStream.writeObject0(ObjectOutputStream.java:1197) ~[na:na]
	at java.base/java.io.ObjectOutputStream.writeObject(ObjectOutputStream.java:354) ~[na:na]
	at java.base/java.util.LinkedHashMap.internalWriteEntries(LinkedHashMap.java:334) ~[na:na]
	at java.base/java.util.HashMap.writeObject(HashMap.java:1497) ~[na:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77) ~[na:na]
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:na]
	at java.base/java.lang.reflect.Method.invoke(Method.java:568) ~[na:na]
	at java.base/java.io.ObjectStreamClass.invokeWriteObject(ObjectStreamClass.java:1201) ~[na:na]
	at java.base/java.io.ObjectOutputStream.writeSerialData(ObjectOutputStream.java:1526) ~[na:na]
	at java.base/java.io.ObjectOutputStream.writeOrdinaryObject(ObjectOutputStream.java:1448) ~[na:na]
	at java.base/java.io.ObjectOutputStream.writeObject0(ObjectOutputStream.java:1191) ~[na:na]
	at java.base/java.io.ObjectOutputStream.defaultWriteFields(ObjectOutputStream.java:1582) ~[na:na]
	at java.base/java.io.ObjectOutputStream.writeSerialData(ObjectOutputStream.java:1539) ~[na:na]
	at java.base/java.io.ObjectOutputStream.writeOrdinaryObject(ObjectOutputStream.java:1448) ~[na:na]
	at java.base/java.io.ObjectOutputStream.writeObject0(ObjectOutputStream.java:1191) ~[na:na]
	at java.base/java.io.ObjectOutputStream.writeObject(ObjectOutputStream.java:354) ~[na:na]
	at java.base/java.util.LinkedHashMap.internalWriteEntries(LinkedHashMap.java:334) ~[na:na]
	at java.base/java.util.HashMap.writeObject(HashMap.java:1497) ~[na:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77) ~[na:na]
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:na]
	at java.base/java.lang.reflect.Method.invoke(Method.java:568) ~[na:na]
	at java.base/java.io.ObjectStreamClass.invokeWriteObject(ObjectStreamClass.java:1201) ~[na:na]
	at java.base/java.io.ObjectOutputStream.writeSerialData(ObjectOutputStream.java:1526) ~[na:na]
	at java.base/java.io.ObjectOutputStream.writeOrdinaryObject(ObjectOutputStream.java:1448) ~[na:na]
	at java.base/java.io.ObjectOutputStream.writeObject0(ObjectOutputStream.java:1191) ~[na:na]
	at java.base/java.io.ObjectOutputStream.writeObject(ObjectOutputStream.java:354) ~[na:na]
	at org.springframework.boot.web.embedded.undertow.FileSessionPersistence.save(FileSessionPersistence.java:69) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.embedded.undertow.FileSessionPersistence.save(FileSessionPersistence.java:62) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.embedded.undertow.FileSessionPersistence.persistSessions(FileSessionPersistence.java:53) ~[spring-boot-3.0.5.jar:3.0.5]
	at io.undertow.servlet.handlers.SessionRestoringHandler.stop(SessionRestoringHandler.java:108) ~[undertow-servlet-2.3.4.Final.jar:2.3.4.Final]
	at io.undertow.servlet.core.DeploymentManagerImpl$3.call(DeploymentManagerImpl.java:617) ~[undertow-servlet-2.3.4.Final.jar:2.3.4.Final]
	at io.undertow.servlet.core.DeploymentManagerImpl$3.call(DeploymentManagerImpl.java:612) ~[undertow-servlet-2.3.4.Final.jar:2.3.4.Final]
	at io.undertow.servlet.core.ServletRequestContextThreadSetupAction$1.call(ServletRequestContextThreadSetupAction.java:42) ~[undertow-servlet-2.3.4.Final.jar:2.3.4.Final]
	at io.undertow.servlet.core.ContextClassLoaderSetupAction$1.call(ContextClassLoaderSetupAction.java:43) ~[undertow-servlet-2.3.4.Final.jar:2.3.4.Final]
	at io.undertow.servlet.core.DeploymentManagerImpl.stop(DeploymentManagerImpl.java:626) ~[undertow-servlet-2.3.4.Final.jar:2.3.4.Final]
	at org.springframework.boot.web.embedded.undertow.DeploymentManagerHttpHandlerFactory$DeploymentManagerHandler.close(DeploymentManagerHttpHandlerFactory.java:80) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.embedded.undertow.UndertowWebServer.stop(UndertowWebServer.java:273) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.boot.web.servlet.context.WebServerStartStopLifecycle.stop(WebServerStartStopLifecycle.java:53) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.context.SmartLifecycle.stop(SmartLifecycle.java:117) ~[spring-context-6.0.7.jar:6.0.7]
	at org.springframework.context.support.DefaultLifecycleProcessor.doStop(DefaultLifecycleProcessor.java:234) ~[spring-context-6.0.7.jar:6.0.7]
	at org.springframework.context.support.DefaultLifecycleProcessor$LifecycleGroup.stop(DefaultLifecycleProcessor.java:373) ~[spring-context-6.0.7.jar:6.0.7]
	at org.springframework.context.support.DefaultLifecycleProcessor.stopBeans(DefaultLifecycleProcessor.java:206) ~[spring-context-6.0.7.jar:6.0.7]
	at org.springframework.context.support.DefaultLifecycleProcessor.onClose(DefaultLifecycleProcessor.java:129) ~[spring-context-6.0.7.jar:6.0.7]
	at org.springframework.context.support.AbstractApplicationContext.doClose(AbstractApplicationContext.java:1045) ~[spring-context-6.0.7.jar:6.0.7]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.doClose(ServletWebServerApplicationContext.java:173) ~[spring-boot-3.0.5.jar:3.0.5]
	at org.springframework.context.support.AbstractApplicationContext.close(AbstractApplicationContext.java:1003) ~[spring-context-6.0.7.jar:6.0.7]
	at org.springframework.boot.devtools.restart.Restarter.stop(Restarter.java:308) ~[spring-boot-devtools-3.0.5.jar:3.0.5]
	at org.springframework.boot.devtools.restart.Restarter.lambda$restart$1(Restarter.java:250) ~[spring-boot-devtools-3.0.5.jar:3.0.5]
	at org.springframework.boot.devtools.restart.Restarter$LeakSafeThread.run(Restarter.java:614) ~[spring-boot-devtools-3.0.5.jar:3.0.5]

2023-03-29T17:05:54.879+09:00  INFO 13796 --- [  restartedMain] io.undertow                              : starting server: Undertow - 2.3.4.Final
2023-03-29T17:05:54.890+09:00  INFO 13796 --- [  restartedMain] o.s.b.w.e.undertow.UndertowWebServer     : Undertow started on port(s) 8080 (http)
2023-03-29T17:05:54.893+09:00  INFO 13796 --- [  restartedMain] bitcamp.app.App                          : Started App in 0.32 seconds (process running for 317.194)
2023-03-29T17:05:54.894+09:00  INFO 13796 --- [  restartedMain] .ConditionEvaluationDeltaLoggingListener : Condition evaluation unchanged
2023-03-29T17:07:36.479+09:00  INFO 13796 --- [   File Watcher] rtingClassPathChangeChangedEventListener : Restarting due to 2 class path changes (0 additions, 0 deletions, 2 modifications)
2023-03-29T17:07:36.481+09:00  INFO 13796 --- [      Thread-15] io.undertow                              : stopping server: Undertow - 2.3.4.Final
```

```java
package bitcamp.myapp.vo;

import java.io.Serializable;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class Member implements Serializable {
  private static final long serialVersionUID = 1L;

  private int no;
  private String name;
  private String email;
  private String password;
  private String tel;

  //Jackson 라이브러리가 Date 타입 값을 JSON 문자열로 변환할 때 사용할 규칙을 설정한다.
  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd")
  private Date createdDate;
}
```

### 3. AuthController.java 에서 각 매핑 메서드마다 HttpSession 객체가 다른 문제

login 후 user 정보를 가져올때 아무리해도 가져오지를 못했다.

자바로 하나씩 로그 찍으면서 확인해보니 AuthController 에서
@PostMapping("login") 의 HttpSession 객체와
@RequestMapping("user") 의 HttpSession 객체가 다른 것을 발견했다.

```bash
bitcamp.app.controller.AuthController    : io.undertow.servlet.spec.HttpSessionImpl@b4acd491
bitcamp.app.controller.AuthController    : io.undertow.servlet.spec.HttpSessionImpl@f313ba63
```

몇시간을 찾다가 발견한 한 블로그에서 해답을 찾았다.

원인은 SpringBoot 환경에서 axios 라는 Promise 기반 HTTP 클라이언트를 사용하였다.
또한, 아래와 같이 특수한 상황이 있었다.

- server : localhost:8080
- client : localhost:3000
- client는 server로 axios 요청을 함

해결 방안은 다음과 같습니다. (블로그 참고함)

1. CORS 문제
   크로스 도메인에 대응하여 spring boot에 다음과 같은 옵션을 줬습니다.

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowCredentials(true)  // 추가
                .allowedHeaders("*")
                .allowedOrigins("http://localhost:3000");
    }
}
```

2. withCredential 문제
   axios 전역변수에 다음과 같이 설정하여 헤더에 session id가 넘어가도록 설정하였습니다.

```javascript
import axios from "axios";
axios.defaults.withCredentials = true;
```

자바로 로그 확인시 HttpSession 객체가 동일함 확인된다.

```java
bitcamp.app.controller.AuthController    : io.undertow.servlet.spec.HttpSessionImpl@b4acd491
bitcamp.app.controller.AuthController    : io.undertow.servlet.spec.HttpSessionImpl@b4acd491
```

참고 : https://blog.voidmainvoid.net/499

# 3월30일 목

## 작업내용

### 1. 이메일, 닉네임 중복 확인 구현

### 2. 비밀번호 체크 정규표현식 작성

```javascript
^(?=._[a-z])(?=._\\d)[A-Za-z\\d!@#$%^&*()_+~`|}{\\[\\]\\\\:';\"<>,./?-]{10,}$
```

chatGPT 에 정규표현식 해석 요청했다.

Q. 정규표현식 패턴 한글로 해석해줘

A. 해당 정규표현식 패턴은 다음과 같은 의미를 갖습니다:

```
(?=._[a-z]): 소문자가 최소한 하나 이상 포함되어 있어야 함
(?=._\d): 숫자가 최소한 하나 이상 포함되어 있어야 함
[A-Za-z\d!@#$%^&*()_+~\|}{
\\:';"<>,./?-]{10,}: 대소문자, 숫자, 특수문자(!@#$%^&*()_+~\|}{
\\:';"<>,./?-`) 중에서 적어도 10개 이상의 문자를 가져야 함
^: 문자열의 시작
$: 문자열의 끝
따라서 이 정규표현식은 "소문자와 숫자가 최소한 하나 이상 포함되어 있으며, 대소문자, 숫자, 특수문자 중에서 적어도 10개 이상의 문자로 이루어진 문자열"을 검사하는 패턴입니다.
```

### 3. 로그인 유지 구현

## 시행착오

### 1.

# 3월31일 금

## 작업내용

### 1. 사용자 프로필 클릭시 작은 모달창 구현(내 프로필, 설정, 로그아웃)

## 시행착오

### 1. Navbar 무한 로딩 현상 해결

Navbar 가 무한 로딩하는 현상이 있어 chatGPT 에게 문의했다.

```
이 코드에서는 getCurrentUser 함수가 비동기적으로 호출되므로, 데이터가 로드되기 전에 currentUser의 상태가 설정될 수 없습니다. 이러한 문제가 발생하면 컴포넌트가 무한 로딩됩니다.

이를 해결하기 위해서는 getCurrentUser 함수가 완료될 때까지 기다리도록 코드를 수정해야합니다. 이를 위해 Navbars 함수 내부에서 getCurrentUser 함수를 호출하는 대신, useEffect hook을 사용하여 컴포넌트가 마운트될 때 한 번 호출하도록 변경해야합니다.
```

기존 코드이다. 무한 로딩이 발생한다.

```javascript
function Navbars() {
  let [currentUser, setCurrentUser] = useState("");

  getCurrentUser(setCurrentUser);

  // 생략
}
```

아래는 수정한 코드이다.

```javascript
function Navbars() {
  let [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  // 생략
}
```

아래처럼 다시 수정하였다.

```javascript
function Navbars() {
  let [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios("http://localhost:8080/auth/user");
        if (result.data.status == "success") {
          setCurrentUser(result.data.data);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        alert("로그인 유저 가져오는 중 오류 발생!");
      }
    };

    fetchData();
  }, []);

  // 생략
}
```

# 4월3일 월

## 작업내용

### 1. 사용자 프로필에서 글쓰기 구현

### 2. 네이버 API 요약 기능 구현

### 3. 네이버 API 번역 기능 구현

### 4. generate 버튼 데이터 주고받는 것 확인 완료

### 5. 로그인 창 이메일, 비번 입력여부 알림말 나오도록 수정. 엔터키로 로그인 되도록 수정

## 시행착오

### 1. setCurrentUser() 로 값 설정 완료 후 실행할 함수 지정은 useEffect() 사용

setCurrentUser() 밑에 handleClovaSummary() 를 넣으니 첫 클릭시 정보 못가져오고 두 번째 클릭시 가져온다.
이유는 setState() 함수는 비동기로 실행되기 때문이다.

setState() 함수 실행이 완료된 후 실행할 함수를 지정할때 useEffect 를 사용한다.
useEffect(1st, 2nd) 에서 2nd 에 [값] 을 전달하면, 그 값이 변경될때 useEffect 를 실행한다.

```javascript
useEffect(() => {
  if (currentUser !== null) {
    handleClovaSummary();
  }
}, [currentUser]);

const HandleClickGenerate = () => {
  axios("http://localhost:8080/auth/user")
    .then((response) => {
      if (response.data.status == "success") {
        setCurrentUser(response.data.data);
      } else {
        setCurrentUser(null);
        alert("로그인 후 이용하세요");
        window.location.reload();
      }
    })
    .catch((error) => {
      console.log(error);
      alert("로그인 유저 가져오는 중 오류 발생!");
    });
};

const handleClovaSummary = () => {};
```

# 4월4일 화

## 작업내용

### 1. 로그인, 회원가입, 글쓰기 창 다크로 변경 및 UI 수정

### 2. 알림로그에 상대회원(other_no) 외래키 컬럼 추가

### 3. 알림 아이콘 UI 추가, 로그인시 알림 데이터 가져오는 것 구현 완료

## 시행착오 또는 기억할 것

### 1. useEffect(1st, [2nd, 3rd]) 배열의 의미

useEffect 에서 배열안에 전달된 2nd, 3rd 값이 변경되면 해당 useEffect 가 실행된다.
아래의 경우 props.contentNo 또는 props.contentType 이 변경되면 useEffect 가 실행된다.

```javascript
useEffect(() => {}, [props.contentNo, props.contentType]);
```

### 2. 리액트에서 key 의 역할

key 는 컴포넌트 각 요소의 고유성 식별에 사용된다.
아래 chatGPT 설명 참고

```
key는 리액트에서 컴포넌트를 렌더링할 때 각 요소의 고유성을 식별하는 데 사용됩니다. 컴포넌트가 렌더링될 때 리액트는 각 컴포넌트 요소에 대한 고유한 key 값을 필요로 합니다. 이 key 값은 해당 요소가 변경되었는지 여부를 식별하고 업데이트 된 데이터가 컴포넌트에 적용되는 방식을 제어하는 데 사용됩니다.

key는 일반적으로 각 컴포넌트의 고유 식별자로 사용됩니다. 배열을 매핑하거나 동적으로 생성된 요소를 렌더링 할 때 사용할 수 있습니다. key는 컴포넌트의 속성으로 전달되며, 컴포넌트 내부에서는 props.key로 접근할 수 있습니다. key 값은 렌더링할 때 변경될 수 없으며, 컴포넌트가 생성될 때 할당되어야 합니다.
```

### 3. Lombok 설치 후 미적용 문제

Eclipse 에서 Lombok 설치 후에도 미설치 에러 발생할 경우
참조 : https://velog.io/@yoontaeng/lombok-%EC%84%A4%EC%B9%98-%EB%B0%A9%EB%B2%95-%EB%B0%8F-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0-%EC%9D%B4%ED%81%B4%EB%A6%BD%EC%8A%A4

### 4. SpringBoot App.java 실행시 '8080 포트 사용 중' 발생

Console 메시지는 다음과 같다.

```
2023-04-04T16:17:28.781+09:00  INFO 4560 --- [  restartedMain] bitcamp.app.App                          : Starting App using Java 17.0.2 with PID 4560 (D:\git\bitcamp-finalproject\total\back-end\bin\main started by USER in D:\git\bitcamp-finalproject\total\back-end)
2023-04-04T16:17:28.785+09:00  INFO 4560 --- [  restartedMain] bitcamp.app.App                          : No active profile set, falling back to 1 default profile: "default"
2023-04-04T16:17:28.844+09:00  INFO 4560 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : Devtools property defaults active! Set 'spring.devtools.add-properties' to 'false' to disable
2023-04-04T16:17:28.844+09:00  INFO 4560 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : For additional web related logging consider setting the 'logging.level.web' property to 'DEBUG'
2023-04-04T16:17:30.097+09:00  WARN 4560 --- [  restartedMain] io.undertow.websockets.jsr               : UT026010: Buffer pool was not set on WebSocketDeploymentInfo, the default pool will be used
2023-04-04T16:17:30.117+09:00  INFO 4560 --- [  restartedMain] io.undertow.servlet                      : Initializing Spring embedded WebApplicationContext
2023-04-04T16:17:30.119+09:00  INFO 4560 --- [  restartedMain] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 1273 ms
2023-04-04T16:17:30.864+09:00  INFO 4560 --- [  restartedMain] o.s.b.d.a.OptionalLiveReloadServer       : LiveReload server is running on port 35729
2023-04-04T16:17:30.895+09:00  INFO 4560 --- [  restartedMain] io.undertow                              : starting server: Undertow - 2.3.4.Final
2023-04-04T16:17:30.904+09:00  INFO 4560 --- [  restartedMain] org.xnio                                 : XNIO version 3.8.8.Final
2023-04-04T16:17:30.913+09:00  INFO 4560 --- [  restartedMain] org.xnio.nio                             : XNIO NIO Implementation Version 3.8.8.Final
2023-04-04T16:17:31.017+09:00  INFO 4560 --- [  restartedMain] org.jboss.threads                        : JBoss Threads version 3.5.0.Final
2023-04-04T16:17:31.085+09:00  INFO 4560 --- [  restartedMain] io.undertow                              : stopping server: Undertow - 2.3.4.Final
2023-04-04T16:17:31.089+09:00  WARN 4560 --- [  restartedMain] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.context.ApplicationContextException: Failed to start bean 'webServerStartStop'
2023-04-04T16:17:31.103+09:00  INFO 4560 --- [  restartedMain] .s.b.a.l.ConditionEvaluationReportLogger :

Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
2023-04-04T16:17:31.122+09:00 ERROR 4560 --- [  restartedMain] o.s.b.d.LoggingFailureAnalysisReporter   :

***************************
APPLICATION FAILED TO START
***************************

Description:

Web server failed to start. Port 8080 was already in use.

Action:

Identify and stop the process that's listening on port 8080 or configure this application to listen on another port.
```

cmd 에 아래 명령 입력해서 8080 포트 사용중인 PID 를 확인한다.

```bash
netstat -ano | findstr :8080
```

명령 프롬프트 우클릭해서 관리자 권한으로 실행한 다음 아래 처럼 입력한다.

```bash
taskkill /f /pid {PID}
```

다시 App.java 실행하면 잘 실행된다.

# 4월5일 수

## 작업내용

### 1. 입력 문장 요약 -> 번역 -> 그림 동기로 작업되게 수정

### 2. 알림 종 클릭시 모달 나오게 함. 그러나 위치 고정

## 시행착오 또는 기억할 것

### 1. props 로 받은 state 는 if 사용해서 state 변경시 업데이트 하기

아래처럼 props 로 state 를 받았을 때,
상위 컴포넌트에서 currentUser 의 변경이 있을때 하위 컴포넌트에서
처음에 null 값이 오고 그 다음 변경된 값이 온다.
이때 값 변경을 처리하려면 if 로 처리하면 된다.

```javascript
function AuthBtn(props) {
  const { currentUser, setCurrentUser } = props;

  if (currentUser !== null) {
    // 변경 처리
  }
}
```

### 2. generage image 시 에러 발생

아래 처럼 실행하면 그림이 나오지만 자바에서 실행하면 에러가 발생한다.

```bash
python c:\Users\bitcamp\git\stable-diffusion-keras\simple_cmd.py "Even if you look outside the window, there are thick clouds, and you can hear the sound of falling rain over and over again and again. You should be careful because the road can be slippery because of the rain." eff9c9c9-233d-40ab-b986-39aa7445296c.png
```

cmd로 해보기 - 성공
java 에서 돌려보기 - 실패
.png 빼고 cmd 로 해보기 - 성공

### 3. 클릭한 객체의 위치 정보 가져오기

event.target.getBoundingClientRect() 를 사용한다.

```javascript
event.target.getBoundingClientRect()

콘솔 출력시 다음과 같다.
bottom: 39.1875
height: 22.3918514251709
left: 880.0087890625
right: 899.6005859375
top: 16.7956485748291
width: 19.591796875
x: 880.0087890625
y: 16.7956485748291
```

### 4. java 의 CompletableFuture 클래스

비동기 작업의 결과값을 반환 받아 이어서 작업할 수 있다.

- 비동기 작업 실행

  - runAsync()
    - 반환값이 없는 경우
    - 비동기로 작업 실행 호출
  - supplyAsync()
    - 반환값이 있는 경우
    - 비동기로 작업 실행 호출

- 작업 콜백

  - thenApply()
    - 반환 값을 받아서 다른 값을 반환함
    - 함수형 인터페이스 Function 을 파라미터로 받음
  - thenAccept()
    - 반환 값을 받아 처리하고 값을 반환하지 않음
    - 함수형 인터페이스 Consumer 를 파라미터로 받음
  - thenRun()

    - 반환 값을 받지 않고 다른 작업을 실행함
    - 함수형 인터페이스 Runnable 을 파라미터로 받음

  - 작업 조합

    - thenCompose
      - 두 작업이 이어서 실행하도록 조합하며, 앞선 작업의 결과를 받아서 사용할 수 있음
      - 함수형 인터페이스 Function 을 파라미티로 받음
    - thenCombine
      - 두 작업을 독립적으로 실행하고, 둘 다 완료되었을 때 콜백을 실행함
      - 함수형 인터페이스 Function 을 파라미터로 받음
    - allOf
      - 여러 작업들을 동시에 실행하고, 모든 작업 결과에 콜백을 실행함
    - anyOf
      - 여러 작업들 중에서 가장 빨리 끝난 하나의 결과에 콜백을 실행함

  - 예외 처리
    - exceptionally
      - 발생한 에러를 받아서 예외를 처리함
      - 함수형 인터페이스 Function 을 파라미터로 받음
    - handle, handleAsync
      - (결과값, 에러)를 반환받아 에러가 발생한 경우와 아닌 경우 모두를 처리할 수 있음
      - 함수형 인터페이스 BiFunction 을 파라미터로 받음

# 4월6일 목

## 작업내용

### 1. 알림 창 알림 준 이 정보 및 내용, 게시물 그림 추가 완료

### 2. DB 정의 알림 로그(aim_alarm_log)에 게시글 번호(board_no) 추가 및 FK 지정 완료

## 시행착오 또는 기억할 것

### 1. 좌우로 div 박스 정렬시키기

부모 요소를 다음과 같이 지정한다.

```HTML
<div className="d-flex justify-content-between w-100">
```

### 2. 본인 div 수직 가운데 정렬시키기

```HTML
<div className="align-self-center">
```

# 4월7일 금

## 작업내용

### 1. 알림 창에서 그림 클릭시 피드로 이동 및 해당 모달 창 발생 구현

### 2. 알림 창 댓글 표시 구현

### 3. 파이썬 코드 resources/pythonapp 에 이동함. java 에서 파이썬 구동 및 그림 생성 확인함

## 시행착오 또는 기억할 것

### 1.

# 4월8일 토

## 작업내용

### 1. 로그인 창에서 회원가입, 회원가입 창에서 로그인 이동 구현

### 2. 알림 창에서 5개씩 로그인 및 더보기 버튼 클릭시 5개씩 로딩되도록 구현

### 3. 회원가입시 이메일 인증 및 메일 발송, 링크 클릭해야 로그인 되도록 구현

## 시행착오 또는 기억할 것

### 1. state 를 설정할때 그 state 를 사용하는게 다른 쪽에도 있으면 공통 부모쪽에서 업데이트 하도록 하라

### 2. URL 의 쿼리 파라미터를 자바스크립트에서 추출하는 방법

```javascript
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
```

### 3. 메일 인증 방법 내 블로그에 남김

# 4월10일 월

## 작업내용

### 1. 네이버 회원가입/로그인 구현

## 시행착오 또는 기억할 것

### 1. CSRF

Cross-Site Request Forgery

사이트 간 요청 위조의 줄임말.

웹 애플리케이션 취약점 중 하나로 사용자가 자신의 의지와 무관하게 공격자가 의도한 행동을 해서 특정 웹페이지를 보안에 취약하게 한다거나 수정, 삭제 등의 작업을 하게 만드는 공격 방법이다.

# 4월11일 화

## 작업내용

### 1. 로그인, 회원가입 모달 어디서나 쓸수 있게 App.js 로 이동

### 2. Generate 클릭시 그림 생성해서 ObjectStorage 에 저장 및 DB 에 주소 저장 완료

## 시행착오 또는 기억할 것

### 1. DAO 는 owner 권한을 하나의 Table 씩 갖는다.

Controller 가 여러 Service 를 사용해도 된다.
Service 가 다른 Service 를 사용하면 안된다. Service 가 여러 DAO 를 사용해도 된다.
DAO 는 하나의 Table 에 owner 권한을 갖는다. 다른 Table 은 viewer 권한을 갖는다.

# 4월12일 수

## 작업내용

### 1. Clova Summary, Papago Translation property 에 중요정보 보관함

## 시행착오 또는 기억할 것

### 1. Java의 AtomicReference 클래스

```
Java의 AtomicReference는 멀티스레드 환경에서 안전하게 객체를 참조하고 수정할 수 있도록 도와주는 클래스입니다.

일반적으로 객체를 참조하고 수정할 때는 여러 스레드에서 동시에 접근할 수 있기 때문에, 스레드 간의 경쟁 상태로 인해 예기치 않은 결과가 발생할 수 있습니다.

하지만 AtomicReference는 내부적으로 CAS(Compare and Swap) 연산을 사용하여 스레드 간의 경쟁 상태를 해결합니다.

이를 통해 멀티스레드 환경에서 안전하게 객체를 참조하고 수정할 수 있으며, synchronized나 Lock과 같은 동기화 방법을 사용하지 않고도 안전성을 보장할 수 있습니다.

AtomicReference는 또한 null 값도 참조할 수 있습니다.

주로 자바의 Concurrent 패키지에서 제공하는 ConcurrentHashMap, ConcurrentLinkedQueue 등에서 사용되어 안전하게 데이터를 처리합니다.
```

### 2. Linux 환경에서 그림 생성

_simple_cmd.py 실행 요구사항_

1. Python 3.8 설치

- 저장소 및 패키지 목록 업데이트:

```bash
sudo apt update
```

- 시스템을 업그레이드하고 필요한 종속성을 설치합니다:

```bash
sudo apt upgrade
```

- python3.8 및 python3.8-venv 패키지를 설치합니다:

```bash
sudo apt install python3.8 python3.8-venv
```

2. git repository 가져오기

```bash
git clone https://github.com/AssemblyAI-Examples/stable-diffusion-keras.git
cd stable-diffusion-keras
```

3. 가상 환경 설정

```bash
apt-get install python3-venv
```

```bash
python3 -m venv venv
```

- Activate (MacOS/Linux)

```bash
source venv/bin/activate
```

- Activate (Windows)

```bash
.\venv\Scripts\activate.bat
```

4. 라이브러리 설치

```bash
pip install "setuptools<60.0"
```

```bash
pip install --upgrade pip
```

```bash
pip install -r requirements.txt
```

5. PYTHONPATH 설정

- MacOS/Linux

```bash
#1 .bashrc 편집
nano ~/.bashrc

#2 파일 끝에 내용 추가
export PYTHONPATH=/root/git/stable-diffusion-keras/venv/lib/python3.8/site-packages:$PYTHONPATH

#3 파일 저장하고 종료 후 적용을 위해 아래 입력
source ~/.bashrc
```

- Windows

```
1. 제어판 > 시스템 > 고급 시스템 설정 > 환경 변수를 엽니다.
2. "시스템 변수" 영역에서 "새로 만들기"를 클릭하거나 "PYTHONPATH" 변수가 이미 있는 경우 "편집"을 클릭합니다.
3. 변수 값에 C:\Users\bitcamp\git\stable-diffusion-keras\venv\Lib\site-packages를 추가하고, 다른 경로와 구분하기 위해 세미콜론(;)을 사용합니다.
4. 확인을 클릭하여 변경 사항을 저장하고 창을 닫습니다.
```

6. CLI 환경 리눅스에서 이미지 보는 방법

```bash
sudo apt-get install catimg

catimg img.png
```

### 3. CPU 환경에서 그림 생성 후 발생하는 에러

CPU 환경에서 그림 생성 후 아래 에러 발생한다.

```
2023-04-12T22:52:41.693+09:00  INFO 2948 --- [nPool-worker-25] bitcamp.app.controller.BoardController   : stdError >>> 2023-04-12 22:46:27.577017: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'cudart64_110.dll'; dlerror: cudart64_110.dll not found
2023-04-12T22:52:41.694+09:00  INFO 2948 --- [nPool-worker-25] bitcamp.app.controller.BoardController   : stdError >>> 2023-04-12 22:46:27.577061: I tensorflow/stream_executor/cuda/cudart_stub.cc:29] Ignore above cudart dlerror if you do not have a GPU set up on your machine.
2023-04-12T22:52:41.694+09:00  INFO 2948 --- [nPool-worker-25] bitcamp.app.controller.BoardController   : stdError >>> 2023-04-12 22:46:34.001240: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'cudart64_110.dll'; dlerror: cudart64_110.dll not found
2023-04-12T22:52:41.694+09:00  INFO 2948 --- [nPool-worker-25] bitcamp.app.controller.BoardController   : stdError >>> 2023-04-12 22:46:34.005585: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'cublas64_11.dll'; dlerror: cublas64_11.dll not found
2023-04-12T22:52:41.694+09:00  INFO 2948 --- [nPool-worker-25] bitcamp.app.controller.BoardController   : stdError >>> 2023-04-12 22:46:34.009817: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'cublasLt64_11.dll'; dlerror: cublasLt64_11.dll not found
2023-04-12T22:52:41.694+09:00  INFO 2948 --- [nPool-worker-25] bitcamp.app.controller.BoardController   : stdError >>> 2023-04-12 22:46:34.014023: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'cufft64_10.dll'; dlerror: cufft64_10.dll not found
2023-04-12T22:52:41.694+09:00  INFO 2948 --- [nPool-worker-25] bitcamp.app.controller.BoardController   : stdError >>> 2023-04-12 22:46:34.018360: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'curand64_10.dll'; dlerror: curand64_10.dll not found
2023-04-12T22:52:41.694+09:00  INFO 2948 --- [nPool-worker-25] bitcamp.app.controller.BoardController   : stdError >>> 2023-04-12 22:46:34.022578: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'cusolver64_11.dll'; dlerror: cusolver64_11.dll not found
2023-04-12T22:52:41.694+09:00  INFO 2948 --- [nPool-worker-25] bitcamp.app.controller.BoardController   : stdError >>> 2023-04-12 22:46:34.026776: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'cusparse64_11.dll'; dlerror: cusparse64_11.dll not found
2023-04-12T22:52:41.694+09:00  INFO 2948 --- [nPool-worker-25] bitcamp.app.controller.BoardController   : stdError >>> 2023-04-12 22:46:34.030964: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'cudnn64_8.dll'; dlerror: cudnn64_8.dll not found
2023-04-12T22:52:41.694+09:00  INFO 2948 --- [nPool-worker-25] bitcamp.app.controller.BoardController   : stdError >>> 2023-04-12 22:46:34.030982: W tensorflow/core/common_runtime/gpu/gpu_device.cc:1934] Cannot dlopen some GPU libraries. Please make sure the missing libraries mentioned above are installed properly if you would like to use GPU. Follow the guide at https://www.tensorflow.org/install/gpu for how to download and setup the required libraries for your platform.
2023-04-12T22:52:41.694+09:00  INFO 2948 --- [nPool-worker-25] bitcamp.app.controller.BoardController   : stdError >>> Skipping registering GPU devices...
```

chatGPT 문의하니 아래 답변 왔다.

```
NVIDIA CUDA Toolkit 설치: https://developer.nvidia.com/cuda-downloads
버전 11.0 이상이 필요합니다. 설치 후, 시스템 환경 변수 PATH에 CUDA 설치 경로를 추가하세요.
cuDNN 라이브러리 설치: https://developer.nvidia.com/cudnn
cuDNN v8 이상이 필요하며, 알맞은 CUDA 버전과 호환되는 것을 선택해야 합니다.
cuDNN 라이브러리를 다운로드 받아 알맞은 CUDA 설치 폴더에 복사합니다.
TensorFlow GPU 버전 설치: TensorFlow GPU 버전을 설치하려면, 아래 명령어를 사용하세요.
Copy code
pip install tensorflow-gpu
설치 후, 프로그램을 다시 실행해 GPU 관련 에러가 해결되는지 확인하세요.
자세한 내용은 TensorFlow GPU 지원 가이드를 참고하세요: https://www.tensorflow.org/install/gpu
```

# 4월13일 목

## 작업내용

### 1. GPU Server 생성 및 stable-diffusion 환경 세팅함

## 시행착오 또는 기억할 것

### 1. 리눅스에서 OpenJDK 17 설치 방법

1. 기존에 설치된 패키지를 제거합니다.

```bash
sudo apt-get remove openjdk-17-jre-headless openjdk-17-jre openjdk-17-jdk-headless openjdk-17-jdk
sudo apt-get autoremove
```

2. 다시 저장소를 추가하고 업데이트합니다.

```bash
sudo apt-get install -y software-properties-common
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update
```

3. Java를 다시 설치합니다.

```bash
sudo apt-get install -y openjdk-17-jdk

java -version
```

### 2. 리눅스에서 현재 실행중인 포트의 pid 확인 및 kill 하는 방법

```bash
lsof -i :3000

kill $(sudo lsof -t -i :3000)
```
