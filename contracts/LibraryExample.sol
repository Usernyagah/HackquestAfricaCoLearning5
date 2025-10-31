// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StringUtils.sol";

contract LibraryExample {
    using StringUtils for string;

    string private topic;

    constructor(string memory initialTopic) {
        topic = initialTopic;
    }

    function setTopic(string memory newTopic) external {
        topic = newTopic;
    }

    function getTopic() external view returns (string memory) {
        return topic;
    }

    function isTopicMatch(string memory input) external view returns (bool) {
        return topic.compareStrings(input);
    }

    function getUpperTopic() external view returns (string memory) {
        return StringUtils.toUppercase(topic);
    }
}
