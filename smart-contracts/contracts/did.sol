// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VerifyPII {
    uint256 number;

    function VerifyMessage(
        bytes32 _hashedMessage,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public pure returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(
            abi.encodePacked(prefix, _hashedMessage)
        );
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }

    function verifySignatureV1(
        string memory _firstname,
        string memory _lastname,
        string memory _country,
        bytes memory signature,
        address _signer
    ) public pure returns (bool) {
        bytes32 messageHash = getMessageHashV1(_firstname, _lastname, _country);
        bytes32 ethSignedMessageHash = getEthSignedMessageHashV1(messageHash);

        return recoverSigner(ethSignedMessageHash, signature) == _signer;
    }

    function getSignerAddressFromSignatureV1(
        string memory _firstname,
        string memory _lastname,
        string memory _country,
        bytes memory signature
    ) public pure returns (address) {
        bytes32 messageHash = getMessageHashV1(_firstname, _lastname, _country);
        bytes32 ethSignedMessageHash = getEthSignedMessageHashV1(messageHash);

        return recoverSigner(ethSignedMessageHash, signature);
    }

    function getMessageHashV1(
        string memory _firstname,
        string memory _lastname,
        string memory _country
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_firstname, _lastname, _country));
    }

    function getEthSignedMessageHashV1(
        bytes32 _messageHash
    ) public pure returns (bytes32) {
        /*
        Signature is produced by signing a keccak256 hash with the following format:
        "\x19Ethereum Signed Message\n" + len(msg) + msg
        */
        return
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    _messageHash
                )
            );
    }

    function recoverSigner(
        bytes32 _ethSignedMessageHash,
        bytes memory _signature
    ) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(
        bytes memory sig
    ) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            /*
            First 32 bytes stores the length of the signature

            add(sig, 32) = pointer of sig + 32
            effectively, skips first 32 bytes of signature

            mload(p) loads next 32 bytes starting at the memory address p into memory
            */

            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        // implicitly return (r, s, v)
    }

    
    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
