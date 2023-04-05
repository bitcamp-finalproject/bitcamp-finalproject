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

### 1.

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

### 2.
