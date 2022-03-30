# 이더리움 Dapp


## 코인 토큰 
1. 이더리움은 공용 코인 
2. erc-20, erc-721(nft) 토큰 표준 
3. 토크을 발행해서 이더를 받고 판다. 
4. STO 증권형 토큰

## 개발 도구 
1. 노드
2. 솔리디티(언어!) 컴파일러 - 객체지향 스마트 컨트랙트 언어
3. 트러플 - 프레임워크
4. 이더리움 노드(web3 provider) - 가나시 
5. 드리즐박스 - 프론트 라이브러리 

## ERC-721 
1. non-fungible - 유일한 토큰 
2. Deed - 소유권 증명서 
3. 인터페이스임 
4. 3개의 이벤트 알림의 목적 
   1. transfer: 쇼유권이 이전되었을 때
      1. balanceOf, ownerOf, safeTransferFrom 
   2. approval: 
   3. approvalForAll

## 명령어 모음 
1. npm install -g truffle
2. truffle unbox drizzle - 프로젝트 생성 
3. truffle version
4. truffle compile --all
5. truffle migrate 가나쉬에 배포 
6. truffle networks 가나쉬에 배포된 토큰 주소 
7. truffle console 
   1. const YGToken = await YGToken.at("배포된 토큰 주소" // 토큰 참조 
8. truffle test
9. truffle migrate --network development
10. cd app && npm run start
11. truffle console --network develop && exec ./send_u.js 


## 추가 모듈 
1. react-router
2. react-router-dom
3. react-bootstrap

## Drizzle box 구성 
1. app - 화면 react  
2. app - src 

## 트러블 슈트 
1. 만약 app 이 안뜨면 metamask 에서 network 세팅을 해본다. 

## 용어 
1. EOA 외부 소유 어카운트
2. SCA 스마트 컨트랙트 소유 어카운트

## solidity
1. payable 수정자 balance 조정 
2. address:  smart contract , balance 호출 가능 
3. msg.sender : EOS 
4. msg.value: 토큰 갯수 





