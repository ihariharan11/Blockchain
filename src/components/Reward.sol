// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FitnessClubRewards {
    struct Member {
        address memberAddress;
        uint256 points;
        bool isMember;
    }
    
    mapping(address => Member) public members;
    address public owner;

    event MemberAdded(address indexed memberAddress);
    event PointsUpdated(address indexed memberAddress, uint256 points);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this function");
        _;
    }

    modifier onlyMember() {
        require(members[msg.sender].isMember, "Only members can execute this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addMember(address _memberAddress) public onlyOwner {
        require(!members[_memberAddress].isMember, "Address is already a member");
        members[_memberAddress] = Member({
            memberAddress: _memberAddress,
            points: 0,
            isMember: true
        });
        emit MemberAdded(_memberAddress);
    }

    function updatePoints(address _memberAddress, uint256 _points) public onlyOwner {
        require(members[_memberAddress].isMember, "Address is not a member");
        members[_memberAddress].points += _points;
        emit PointsUpdated(_memberAddress, members[_memberAddress].points);
    }

    function getPoints(address _memberAddress) public view returns (uint256) {
        require(members[_memberAddress].isMember, "Address is not a member");
        return members[_memberAddress].points;
    }

    function redeemPoints(address _memberAddress, uint256 _points) public onlyOwner {
        require(members[_memberAddress].isMember, "Address is not a member");
        require(members[_memberAddress].points >= _points, "Insufficient points");
        members[_memberAddress].points -= _points;
        emit PointsUpdated(_memberAddress, members[_memberAddress].points);
    }

    // Additional function to check if an address is a member
    function isMember(address _memberAddress) public view returns (bool) {
        return members[_memberAddress].isMember;
    }
}
