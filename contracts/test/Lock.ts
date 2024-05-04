import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress } from "viem";

describe("OnchainRisk", function() {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const contract = await hre.viem.deployContract("OnchainRisk");

    const publicClient = await hre.viem.getPublicClient();

    return {
      contract,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function() {
    it("Should set the right unlockTime", async function() {
      const { contract } = await loadFixture(deployOneYearLockFixture);
      const proof: `0x${string}` = "0x075aa90d9fbd4e6c60e2c320fd1def0bf60eefe2b507293c6ccd662d3dee96f1180ff33db2c700e2ae4f7631f16a5c3d398dc7952d391ba0bdcd86ce40c9ef7914fdf324af6accff6b8cbb59cca950d44538b8fa2308a1ca0ffbf67fdcc2c9a81973e79488e573a49d49df5c29fb6a4f51770774fac84ae0b3985da2c3ac3926070c6a82377c437e667c23c635e3c742f15d72239f77ed6d696cae45bd081dc71120563425bcc2932a1628859971223c56989ba770eddd6556e544a9434a404109479edf4ac97178e39de4de9358c80974e753384f29dc9b72f54cea852f93be19682ff288880856eade69d4d4c1977e9d0a0e9609db78d009aa216c74da6f1d24f6c41cfb4bbfdf1ee766b36937554debc3765e835eaa9ff2aa93bcef0816ff2e5b17259f4cae9587ff00c0158c8eb15d96039f0509a913f6061fbf48fd04ec05de38b95842743722eb2e375d66f41c259741a7d25e036c31d3370937b6211107b1ab1d166f9ed44d7442f699bf8e21a667b90ca2afc017da3659e5e402ec9b1d27b582d57749783b678157d32af7cf97011a1dcef91fde1c163db11e9549960f19ea4d4b8827355198408a5f95c69f010586a1350d052765ffef8a03314553305d8863903d47426b941106f515fd506948f9316efa2e0cd268422f751ac5ef1b2d04edfddd323ff8184ec9617c16214a79ec87b698f4ab8c6c2e5024c34b4020993fb828465106dc7483e1abc911106fe70bfe78e73f71aa869596d201fd2206fa57b011fb7287e317bae8f084151bb2ed70f1777260abca44a2ee9c2d1f901fa741eff62c72366ec4b05ae148aeb9bb378248a3632be53efe9499faa164f11134e73c2429ef581511f86a20d152b6e20c5d9ccf067d481df635de6cb5a9b2160e10b5b37eb67679f60a5822bef9edb468b57858d9b751fc54395373c195781c3445ca8d7c71356e5877352f17c6468e202d7e2b8d902e66173b85727dc0621ea9715fd18ccd7e431f8fbe588a3c3229141ef6c7dd364d80aeed89d5ed75fd1f95c75296b5289c0226264eb001c6ec085d562d9598ee72f6c0771b112883582858ffed2a61207059ffe1be601bc56896fa7bb52df1a43300d67380d0796cc60ab8f5aef0101deb98e01fcb7b5f737928914004b9bfe23b0e2fd9ae98e15e411c715fb1a92f32734848eb403d44fe987c96e22d5efc55ac6a4d1a37f13c77392dc38a6570110f0c052d7b7a9185e7ac7fef4d3f7e790444bfc6424e7998a5ea190a4f7da26c5527c7786a927b2b6ebffeca1ae497ceca82ea8fbed1416451d410fc00df49038402445f8016f4ff6c7f6e399f2e2b8c34c51f141c9285c225a419a540f047a7579cba1a8b4c9b458dbbcd8283415659793ed2ad795b6af03f7b2c2c6512b71325620e60371b998922954e719677560f0541a3060dbfe9c8ec12249137a7dc1a6d33731e967ddfc610e64007ed87eb585726c03f806ef3246a232020cce58dd7619cac5e13d770f3b3f6dce4616e3f67e03b67e41618c8d7fa4d14e3c9001529f9868dec2cd95d0349d1c70d741be58f4d32c90cd35c22e505dc2ed8496948393e247cd6d21806f25fc704b75a3e9b87a6d74ada6e4b214aa64e2afd56cce2f26f865f72dc50c3d9b7fe15b2aa3b40a9aed332f445d1d90d18462f31abd3969a4db175bd5602710a99dbfb03e375da07af40539afafb5f97ccb01eee2a4643400f2469cb2423607cf575afb45c9b9fb61eea779d1b80386fc6fc2107561be9dbba3d92b709e5dd0ab9ca541f6bc0dc1f66d6aa26a46ba62067e21c6ccc9f0cc4e3c87b67f4774b08996213d884c1601e114658b59681d71633732d77d6df2418e4187cbc091feb0255eb852b0ed66d00cc0bcabc0aa89c4d7d662bad66cfcf4b7ea2134c3fcaf3207f5c4dad104eef6fb584660a9c1d5f23c1d22ecb759e7dbd32340a37061bc0e305064149372fa4cc6ed00383521dda1fbb951e87f4112a62f3a6fe44d43cb055609ff5f9b0556a7ade7a278572a2b2f7b5e10e447283d708b519f252a25d9fc7bc39aaaa297b30294e244b8793278bcfb02d2e653f6964e016b69eb0b63510bb7030878e8ae96f912e5fb36ba94054a7aa7a0eaaa8b8efe5d0975dd8f2444fef510f6464d5c165648e949b9f3c051147c148143f979d592d93b0d1d08a47211c946e256aa565a018a44ec16148d07c25b0ee14fc8e417566fbe218fd4668436dacf92b18738860793c61eb58bcd2785b80d10b1a8e442eff2948790249d02f8567bda68f28a4e243526220d1c7a975715c152532b67a00d3696c6da53c3eea055317b2962aebe6d9a299f8ca833a4abce2dc155d6e01981eca1c7b3b7c34700f742a31c557508b02a01528ede24753ccc8050605a931d9b85f8d07d13919fa2b16d3669f0d392742edd8d90be0b385faf8662f367226a8d2263c0ea31387d4c9b5f4c15d76a47db7a2bf6cbc2bd0baf19d19184548388fb3ba57d58a17700ad2d379531eea610bdfde2bb85d0a1e6117fe6d2adfb13ff0f9a3ac69498dd35fad4540d0ff2b63f68fb2c8123e6cdc35b57a390f06da59e13b2b3297045472c4121f13e543f7e80c2df783f6873f59e94683fd01fda3b7f2d7d5497343e12664f1b1fe15e05bea1a7789f45825b307817c8d0a07e6b76bd3a3af932b289c6ad993b447e8a767a4864cdbb502fadd0a21c6a92620c16dee408a239ef59421a45720af7c7acf4f16790550f7652b6a3f9c97373f0937d5fdcc3ef78107af6127532c5253e4c34e3ff20455a8837a01e12767c55722128c8039256b8cd21ae660d0b94d8876eb35b1e4bccaeae5aa8f16a23853700f61d40b440271503334150f5894485b0c5314cc48e5855ca0831003678be94213319f750ac4425d9329673738e1d248bd58e7d66c773dbd8f8eb8993804af0b09be8445734b8ff8621f3f3cfa025d93701f053d3d2dec3205cac78dd919fe5006e2fa174b6d44a231cc0a0ba39a234f583acb375a8546cc6e54fdbbeb0dfe08"
      const inputs: `0x${string}`[] = ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000004", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000004", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000004", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000004", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000004", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000004", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000004", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000004", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x0000000000000000000000000000000000000000000000000000000000000032", "0x00000000000000000000000000000000000000000000000000000000000000f1", "0x0000000000000000000000000000000000000000000000000000000000000091", "0x000000000000000000000000000000000000000000000000000000000000008e", "0x0000000000000000000000000000000000000000000000000000000000000085", "0x0000000000000000000000000000000000000000000000000000000000000062", "0x0000000000000000000000000000000000000000000000000000000000000023", "0x000000000000000000000000000000000000000000000000000000000000006e", "0x00000000000000000000000000000000000000000000000000000000000000b1", "0x000000000000000000000000000000000000000000000000000000000000007a", "0x00000000000000000000000000000000000000000000000000000000000000dc", "0x0000000000000000000000000000000000000000000000000000000000000085", "0x0000000000000000000000000000000000000000000000000000000000000002", "0x0000000000000000000000000000000000000000000000000000000000000033", "0x000000000000000000000000000000000000000000000000000000000000002f", "0x000000000000000000000000000000000000000000000000000000000000004c", "0x000000000000000000000000000000000000000000000000000000000000009c", "0x0000000000000000000000000000000000000000000000000000000000000082", "0x00000000000000000000000000000000000000000000000000000000000000bc", "0x0000000000000000000000000000000000000000000000000000000000000014", "0x00000000000000000000000000000000000000000000000000000000000000e1", "0x000000000000000000000000000000000000000000000000000000000000009b", "0x00000000000000000000000000000000000000000000000000000000000000fc", "0x000000000000000000000000000000000000000000000000000000000000000a", "0x00000000000000000000000000000000000000000000000000000000000000a1", "0x000000000000000000000000000000000000000000000000000000000000000a", "0x00000000000000000000000000000000000000000000000000000000000000b6", "0x0000000000000000000000000000000000000000000000000000000000000074", "0x00000000000000000000000000000000000000000000000000000000000000ff", "0x0000000000000000000000000000000000000000000000000000000000000075", "0x00000000000000000000000000000000000000000000000000000000000000b3", "0x00000000000000000000000000000000000000000000000000000000000000d2", "0x00000000000000000000000000000000000000000000000000000000000000f3"]

      expect(await contract.read.verifyProof([proof, inputs]) == true);
    });
  });
});
