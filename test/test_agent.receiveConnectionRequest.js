const { assert, expect } = require('chai');
const app = require('../src/server');
const fs = require('fs')
const path = require('path')
const validJwt = fs.readFileSync(path.join(__dirname, './fixtures/valid-jwt.txt'))
const { sendRequest } = require('../src/utils')
const { API_URL, SERVER_PORT, AGENT_PREFIX } = require('../src/constants')
const request = require('request')

describe('/agent/receiveConnectionRequest POST', () => {
  before(async () => {
    server = app.listen(SERVER_PORT, () => {});

    headers = {
      authorization: `Bearer ${validJwt}`,
      'content-type': 'application/ssi-agent-wire',
    }
  });

  after(() => {
    server.close();
  });

  it.skip('agent - should successfully receive a connection request', async () => {
    const jwe = JSON.stringify({"protected":"eyJlbmMiOiJ4Y2hhY2hhMjBwb2x5MTMwNV9pZXRmIiwidHlwIjoiSldNLzEuMCIsImFsZyI6IkF1dGhjcnlwdCIsInJlY2lwaWVudHMiOlt7ImVuY3J5cHRlZF9rZXkiOiJ6NEhDaXJRM3p1RVBUcGRuWG5vTmpIU3BOZEdMakg0MW9hd0FsT05Pa05JLTdGZHhoTG1Kb2NKQjFTLXRxVFQyIiwiaGVhZGVyIjp7ImtpZCI6IjNickIyeGo1cDJQQnRkWWZNOHZZc2pXZ1VUaGVpRnNZNzdMMVNua1FwdWd3IiwiaXYiOiJKN3NrWm5Oek5NUy1TaXpYcDJjOFV4OFhmTHg3Y1p4SCIsInNlbmRlciI6Ik9GT21LZkJCTTFOa3FGMmFwYWhkVURUa0JPdVBfYThxM2ZNS2V3aEc3VllzMDRiSERtTG1IVndJSV9OMzZfdkhrU1k1NmRNLXpYZ2dDTnIwSGZhY0hlb3U3TjB4Tm5mYW5sRklHcWR1VGNmU0JLX1lFaXFJX3FfOWt1ND0ifX1dfQ==","iv":"-Y9fliFDib78IeXG","ciphertext":"QjJOW-NRZERD-FQ2CKo3kR1lRVM8kBm8gfpd70c8Ue7nVbE3Ei1Euz8TK0vMlSHLbmO4BXX6QqocxR3SH1PDPGjGnmkTrUfoyBOmMThBxyt2ZD4WCNofJUOL2JUqyax9RI_o--d1JrmAGMPiFX8mMk389BM1FTcGje3j06v7gf7JcSltg04THHHIcG2MUT9C9atEjPzzQgg3A4IKjc7R1_NmV_mNkcMa2esqO-Q6Cuj2ag996euc9XB4Y7PzKUvM84Kmi8aU6sOKMxHOQU3-Vhi8N_mkwvKSxRlvRdcr10Ue3JCI1dsS4hJcpv0UwsIVu6ngeGe1RMpHFiJuTmNGnMJRBb7cqiGG-SXk_xA_KazY4w0OlXxsCYa_DlFX5sPJyZ2Rq4ZGD_fVRMR7Vor-2O-zhDw-nPmeO74SYx_0bhvmu1S4p3_Rxa9fD_4Tdf544RE3YHxmZtZLyBXdYou2MPeRMq-MwfBdwteFrR1-DHDVW6cdtDhJP-91SZ3BiK75UcPHRGkyybonwN1FPmVxkPiC9Z0DjAMzOpSbhm9SINGZA7kcK8loR71BUTlKQM7Wx2WlzOpwl7-4Fab3goH4w9gWCgcov9ZZ-NXLgiwr3qaYUv1Zuf5OAGlfEHULndBJw95yc_wr8WvQKTqg1okpakGx8KkvYitmLqcTlmI7grfLhwTtfyQf7jUvahDc92Cido9lo1iBwInxGY0ZH89Gn9X8ZuJHZ4CyZsdLMCo5TnP-HTXCPKGOhyEG_o57pQSZmdMMpQDrH00HMMK6R4H5mDL_wD3N-1Hgx072tSraf-_l5Rwm10de6nQ5GlH-Lr8_tml1JJf2ibl27S-6vg2fxDklzAXc_ng6HN7M0JzbBcdRFzx7_wskwWMhTyMJQcb-5mDZhmbqZHE=","tag":"897biUDhVhcneoJX9NCmTg=="})
    const connectionResponse = await app.indyAgent.receiveConnectionRequest(jwe)
    const response = JSON.parse(connectionResponse.toString())
    expect(response).to.have.all.keys('protected', 'iv', 'ciphertext', 'tag')


    /**
     * TODO
     * 
     *     const sig = signedConnectionRes['connection~sig']

    const verified = await indy.cryptoVerify(
        sig.signer, 
        Buffer.from(sig.sig_data, 'base64'), 
        Buffer.from(sig.signature, 'base64')
    ) 

        console.log(verified)
        console.log(verified)
        console.log(verified)
        console.log(verified)

     */
  })

  it.skip('should successfully receive a connection request', async () => {
    const jwe = {"protected":"eyJlbmMiOiJ4Y2hhY2hhMjBwb2x5MTMwNV9pZXRmIiwidHlwIjoiSldNLzEuMCIsImFsZyI6IkF1dGhjcnlwdCIsInJlY2lwaWVudHMiOlt7ImVuY3J5cHRlZF9rZXkiOiJ6NEhDaXJRM3p1RVBUcGRuWG5vTmpIU3BOZEdMakg0MW9hd0FsT05Pa05JLTdGZHhoTG1Kb2NKQjFTLXRxVFQyIiwiaGVhZGVyIjp7ImtpZCI6IjNickIyeGo1cDJQQnRkWWZNOHZZc2pXZ1VUaGVpRnNZNzdMMVNua1FwdWd3IiwiaXYiOiJKN3NrWm5Oek5NUy1TaXpYcDJjOFV4OFhmTHg3Y1p4SCIsInNlbmRlciI6Ik9GT21LZkJCTTFOa3FGMmFwYWhkVURUa0JPdVBfYThxM2ZNS2V3aEc3VllzMDRiSERtTG1IVndJSV9OMzZfdkhrU1k1NmRNLXpYZ2dDTnIwSGZhY0hlb3U3TjB4Tm5mYW5sRklHcWR1VGNmU0JLX1lFaXFJX3FfOWt1ND0ifX1dfQ==","iv":"-Y9fliFDib78IeXG","ciphertext":"QjJOW-NRZERD-FQ2CKo3kR1lRVM8kBm8gfpd70c8Ue7nVbE3Ei1Euz8TK0vMlSHLbmO4BXX6QqocxR3SH1PDPGjGnmkTrUfoyBOmMThBxyt2ZD4WCNofJUOL2JUqyax9RI_o--d1JrmAGMPiFX8mMk389BM1FTcGje3j06v7gf7JcSltg04THHHIcG2MUT9C9atEjPzzQgg3A4IKjc7R1_NmV_mNkcMa2esqO-Q6Cuj2ag996euc9XB4Y7PzKUvM84Kmi8aU6sOKMxHOQU3-Vhi8N_mkwvKSxRlvRdcr10Ue3JCI1dsS4hJcpv0UwsIVu6ngeGe1RMpHFiJuTmNGnMJRBb7cqiGG-SXk_xA_KazY4w0OlXxsCYa_DlFX5sPJyZ2Rq4ZGD_fVRMR7Vor-2O-zhDw-nPmeO74SYx_0bhvmu1S4p3_Rxa9fD_4Tdf544RE3YHxmZtZLyBXdYou2MPeRMq-MwfBdwteFrR1-DHDVW6cdtDhJP-91SZ3BiK75UcPHRGkyybonwN1FPmVxkPiC9Z0DjAMzOpSbhm9SINGZA7kcK8loR71BUTlKQM7Wx2WlzOpwl7-4Fab3goH4w9gWCgcov9ZZ-NXLgiwr3qaYUv1Zuf5OAGlfEHULndBJw95yc_wr8WvQKTqg1okpakGx8KkvYitmLqcTlmI7grfLhwTtfyQf7jUvahDc92Cido9lo1iBwInxGY0ZH89Gn9X8ZuJHZ4CyZsdLMCo5TnP-HTXCPKGOhyEG_o57pQSZmdMMpQDrH00HMMK6R4H5mDL_wD3N-1Hgx072tSraf-_l5Rwm10de6nQ5GlH-Lr8_tml1JJf2ibl27S-6vg2fxDklzAXc_ng6HN7M0JzbBcdRFzx7_wskwWMhTyMJQcb-5mDZhmbqZHE=","tag":"897biUDhVhcneoJX9NCmTg=="}
    const res = await sendRequest(API_URL, AGENT_PREFIX, 'POST', jwe, headers)

    const { statusCode, body } = res

    assert.strictEqual(statusCode, 201, 'Incorrect status code')
    assert.equal(typeof body, 'string', 'response returned incorrectly')
    expect(JSON.parse(body)).to.have.all.keys('protected', 'iv', 'ciphertext', 'tag')
  })
})