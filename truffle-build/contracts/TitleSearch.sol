pragma solidity >=0.5.0;

contract TitleSearch {
    event AddedRecord(bytes32 indexed event_id, bytes32 indexed db_type, string record);
    address private chairperson;
    constructor() public payable {
        chairperson = msg.sender;
    }
    
    modifier onlyChairperson() {
        require(msg.sender == chairperson, "Only chairperson can call this");
        _;
    }
    
    function addRecord(bytes32 unique_id, bytes32 db_name, string memory record) public onlyChairperson {
        emit AddedRecord(unique_id, db_name, record);
    }
}