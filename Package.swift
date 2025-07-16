// swift-tools-version:6.0

import PackageDescription

let package = Package(
    name: "PicoChatUI",
    platforms: [.macOS(.v14), .iOS(.v17), .tvOS(.v17)],
    products: [
        .executable(
            name: "PicoChatUIServer",
            targets: ["PicoChatUIServer"]
        ),
        .library(
            name: "PicoChatUI",
            targets: ["PicoChatUI"]
        ),
    ],
    dependencies: [
        .package(url: "https://github.com/hummingbird-project/hummingbird.git", from: "2.14.0"),
        .package(url: "https://github.com/hummingbird-project/hummingbird-auth.git", from: "2.0.0"),
        .package(url: "https://github.com/vapor/jwt-kit.git", from: "5.1.2"),
        .package(url: "https://github.com/apple/swift-crypto.git", from: "3.0.0"),
        .package(url: "https://github.com/apple/swift-argument-parser.git", from: "1.3.0"),
    ],
    targets: [
        .executableTarget(
             name: "PicoChatUIServer",
             dependencies: [
                 "PicoChatUI",
                 .product(name: "Hummingbird", package: "hummingbird"),
                 .product(name: "ArgumentParser", package: "swift-argument-parser"),
                 .product(name: "HummingbirdBcrypt", package: "hummingbird-auth"),
                 .product(name: "HummingbirdAuth", package: "hummingbird-auth"),
                 .product(name: "HummingbirdBasicAuth", package: "hummingbird-auth"),
                 .product(name: "JWTKit", package: "jwt-kit"),
                 .product(name: "Crypto", package: "swift-crypto"),
             ],
             path: "Sources/PicoChatUIServer"
         ),
        .target(
            name: "PicoChatUI",
            dependencies: [
                .product(name: "Hummingbird", package: "hummingbird"),
                .product(name: "HummingbirdBcrypt", package: "hummingbird-auth"),
                .product(name: "HummingbirdAuth", package: "hummingbird-auth"),
                .product(name: "HummingbirdBasicAuth", package: "hummingbird-auth"),
                .product(name: "JWTKit", package: "jwt-kit"),
                .product(name: "Crypto", package: "swift-crypto"),
            ],
            path: "Sources/PicoChatUI",
            resources: [
                .copy("build")
            ]
        ),
    ]
)
