# 이더리움 Dapp

## 프로젝트 구종 
1. blockChainInAction
   1. ballot-app, ballot-contract : 투표 
   2. blindAuction : 블라인드 옥션
2. testDapp 
   1. Drizzle Box

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

## 코드 실행 순서
1. contract 가나쉬에 배포 
2. truffle-config 세팅 
3. app 실행 
4. 매타마스크 로컬 가나쉬에 연결 
5. 메타마스크에 계정 추가할떄 가져오기로 하는게 속 편할 듯 하다. - 가나쉬에서 열쇠모양 누르면 키를 가져 올 수 있음 

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
2. truffle init -- smart contract 프로젝트 생성 
3. truffle unbox drizzle - 프로젝트 생성 
4. truffle version
5. truffle compile --all
6. truffle migrate 가나쉬에 배포 
7. truffle networks 가나쉬에 배포된 토큰 주소 
8. truffle console 
   1. const YGToken = await YGToken.at("배포된 토큰 주소" // 토큰 참조 
9. truffle test
10. truffle migrate --network development
11. cd app && npm run start
12. truffle console --network develop && exec ./send_u.js 


## 추가 모듈 
1. react-router
2. react-router-dom
3. react-bootstrap

## Drizzle box 구성 
1. app - 화면 react  
2. contracts - 계약 
3. 단점 
   1. openZeppline 버전이 너무 낮은게 설치된다. erc 코드가 구 버전이라서 신 기능 사용 불가 
   2. 그렇다고 openZeppline 을 올리기엔 뭔가 버그가 생길것 같은 느낌이 든다. 

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

## 롭스텐
1. 이더리움 블록체인을 구현한 퍼블릭 테스트 네트워크 
2. 니모닉 개인키가 필요  (https://iancoleman.io/bip39/)

## test
1. cd test
2. truffle test testBenefitToken.js 
3. --compile-none // compile 없이 
4. truffle test testBenefitToken.js --compile-none -g "requestBenefit" testname 으로 
5. transaction 이 없는 function 에 대해서만 .call() 을 쓸 수 있다. 







