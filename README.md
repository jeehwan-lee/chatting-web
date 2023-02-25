# chatting web with javascript

> node.js의 express 모듈과 socket.io를 사용한 실시간 웹 채팅 프로젝트입니다.

## 목차

- [들어가며](#들어가며)

  - [프로젝트 소개](#1-프로젝트-소개)

  - [프로젝트 기능](#2-프로젝트-기능)

  - [사용기술](#3-사용기술)

  - [실행화면](#4-실행화면)

- [구조 및 설계](#구조-및-설계)

- [추후 업데이트](#추후-업데이트)

- [후기](#후기)

## 들어가며

### 1. 프로젝트 소개

이 프로젝트는 웹 소켓을 통한 실시간 채팅에 대해 공부해보기 위해 시작했습니다.

서버는 node.js의 express 모듈과 socket.io 모듈을 통해 실시간 채팅을 구현했고

프론트부분은 웹 개발의 기본이 되는 HTML과 CSS 그리고 Javascript를 사용해서 개발했습니다.

프로젝트의 전체 진행과정은 [chatting server](https://jeehwan94.tistory.com/53)를 통해 확인할 수 있습니다.

### 2. 프로젝트 기능

프로젝트의 기능은 다음과 같습니다.

- 서버

  - 소켓을 통한 클라이언트와 연결

  - socket.io의 room을 통한 클라이언트 사이의 연결

  - 각 채팅방에 접속한 클라이언트 수 표시

- 클라이언트

  - 소켓을 통한 서버와 연결

  - 채팅방 개설 및 입장 / 나가기

  - 메세지 전송

### 3. 사용기술

- 프론트엔드

  - HTML 및 CSS

  - Javascript

- 백엔드

  - node.js

  - express

  - socket.io

  - nodemon

- 빌드 및 배포

  - babel

  - AWS EC2

### 4. 실행화면

<details>
<summary>메인 페이지</summary>

</details>

<details>
<summary>채팅방 개설</summary>

</details>

<details>
<summary>채팅방 입장</summary>

</details>

<details>
<summary>메세지 전송</summary>

</details>

<details>
<summary>채팅방 나가기</summary>

</details>

## 구조 및 설계

## 추후 업데이트

### 1. 데이터베이스를 통한 채팅내역 관리

### 2. 로그인 기능

### 3. 안읽은 메세지 개수 보여주기

### 4. 안읽은 메세지 표시 (상대방)

### 5. 사진 보내기

## 후기

- spa 를 사용해야겠다고 깨달음 : 하나의 페이지에서 socket 연결을 유지
- 이벤트 버블링을 사용하면 동적으로 만든 엘리먼트에 이벤트 리스너 등록이 수월
