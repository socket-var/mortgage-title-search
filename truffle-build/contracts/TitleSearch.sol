pragma solidity >=0.5.0;

contract TitleSearch {
    event AddedRecord(bytes32 text );
    function addRecord(bytes32 bar) public {
        emit AddedRecord(bar);
    }
}