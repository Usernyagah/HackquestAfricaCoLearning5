// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library StringUtils {
    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function toUppercase(string memory str) internal pure returns (string memory) {
        bytes memory bStr = bytes(str);
        for (uint256 i = 0; i < bStr.length; i++) {
            uint8 c = uint8(bStr[i]);
            if (c >= 97 && c <= 122) {
                bStr[i] = bytes1(c - 32);
            }
        }
        return string(bStr);
    }
}
