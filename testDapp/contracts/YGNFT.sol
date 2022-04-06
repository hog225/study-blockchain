pragma solidity ^0.5.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
contract YGNFT is ERC721 {
    using SafeMath for uint256;
    using Address for address;

    mapping (bytes4 => bool) supportedInterfaces;
    mapping (uint256 => address) tokenOwners;
    mapping (address => uint256) balances;
    // 권리가 있는
    mapping (uint256 => address) allowance;
    // 중계인
    mapping (address => mapping(address => bool)) operators;

    struct asset {
        uint8 x; //face
        uint8 y; //eye
        uint8 z; //mouth
    }

    asset[] public allTokens;
    uint256[] public allValidTokenIds;
    mapping(uint256 => uint256) private allValidTokenIndex;

    constructor () public {
        // 먼소린지 잘모르겠는데 ERC721의 함수들을 전부 exclusive or 한값을 true 로 준다는것은
        // 그냥 모든 함수 사용하겠다. 이런 의미 같다.
        supportedInterfaces[0x80ac58cd] = true; //ERC721
        supportedInterfaces[0x01ffc9a7] = true; //ERC165
    }

    function supportsInterface(bytes4 interfaceId) external view returns (bool) {
        return supportedInterfaces[interfaceId];
    }
    // balance 확인
    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

    // 소유자
    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = tokenOwners[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token"); // 예외

        return owner;
    }

    //소유권 이전
    function transferFrom(address from, address to, uint256 tokenId) public {
        address addr_owner = ownerOf(tokenId);
        //solhint-disable-next-line max-line-length
        require(addr_owner == from, "from is not match addr_owner");
        require(to != address(0), "Transfer address 0 is invalid ");
        address addr_allowd = allowance[tokenId];
        bool isOp = operators[addr_owner][msg.sender];
        require(addr_owner == msg.sender || addr_allowd == msg.sender || isOp, "msg Sender can not transfer");

        tokenOwners[tokenId] = to;
        balances[from] = balances[from].sub(1);
        balances[to] = balances[to].add(1);
        // address resst
        if (allowance[tokenId] != address(0)) {
            delete allowance[tokenId];
        }

        // transfer event 발생
        emit Transfer(from, to, tokenId);

    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public {
        transferFrom(from, to, tokenId);
        if (to.isContract()) {
            bytes4 result = ERC721TokenReceiver(to).onERC721Received(msg.sender, from, tokenId, _data);
            require(result == bytes4(keccak256("onERC721Received(address,address,uint256,bytes)")), "Recipt of token is not completed ");
        }
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId, "");
    }

    function approve(address approved, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        bool isOp = operators[owner][msg.sender];

        require(owner == msg.sender || isOp, "not approved by owner");

        allowance[tokenId] = approved;
        emit Approval(owner, approved, tokenId);
    }
    function setApprovalForAll(address operator, bool approved) public {
        operators[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        return allowance[tokenId];
    }

    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        return operators[owner][operator];
    }

    // 토큰 생성
    function mint(uint8 x, uint8 y, uint8 z) external payable {
        asset memory newAsset = asset(x, y, z);
        uint tokenId = allTokens.push(newAsset) - 1;
        tokenOwners[tokenId] = msg.sender;
        balances[msg.sender] = balances[msg.sender].add(1);

        allValidTokenIndex[tokenId] = allValidTokenIds.length;
        allValidTokenIds.push(tokenId);
        // 생성시에도 Transfer 이벤트 발생 시켜궈야 함
        emit Transfer(address(0), msg.sender, tokenId);
    }

    //토큰 삭제
    function burn(uint256 tokenId) external {
        address addr_owner = ownerOf(tokenId);
        require(addr_owner == msg.sender, "msg.sender is not owner ");

        if (allowance[tokenId] != address(0)) {
            delete allowance[tokenId];
        }
        tokenOwners[tokenId] = address(0);
        balances[msg.sender] = balances[msg.sender].sub(1);
        removeInvalidToken(tokenId);

        emit Transfer(addr_owner, address(0), tokenId);
    }

    function removeInvalidToken(uint256 tokenId) private {
        uint256 lastIndex = allValidTokenIds.length.sub(1);
        uint256 removeIndex = allValidTokenIndex[tokenId];

        uint256 lastTokenId = allValidTokenIds[lastIndex];
        allValidTokenIds[removeIndex] = lastTokenId;
        allValidTokenIndex[lastTokenId] = removeIndex;

        allValidTokenIds.length = allValidTokenIds.length.sub(1);
        allValidTokenIndex[tokenId] = 0; // no meaning
    }

    // ERC721 Enumarable 확장 인터페이스
    // 발행한 유효한 모든 토큰
    function totalSupply() public view returns (uint) {
        return allValidTokenIds.length;
    }

    function tokenByIndex(uint256 index) public view returns (uint) {
        require(index < totalSupply());
        return allValidTokenIds[index];
    }

    //ERC 721 metadata
    function name() external pure returns (string memory) {
        return "EMOJI TOKEN";
    }

    function symbol() external pure returns (string memory) {
        return "EMJ";
    }

}

contract ERC721TokenReceiver {
    function onERC721Received(address operator, address from, uint256 tokenId, bytes memory data) public returns(bytes4);
}
