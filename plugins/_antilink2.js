let linkRegex = /\b((https?:\/\/|www\.)?[\w-]+\.[\w-]+(?:\.[\w-]+)*(\/[\w\.\-\/]*)?)\b/ig
let handler = m => m
handler.before = async function (m, { isAdmin, isBotAdmin, isOwner, isROwner, participants }) {
if (isAdmin || isOwner || isROwner || m.fromMe) return
if (m.isBaileys && m.fromMe) return
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
let delet = m.key.participant
let bang = m.key.id
const user = `@${m.sender.split`@`[0]}`
//const groupAdmins = participants.filter(p => p.admin)
//const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')
let bot = global.db.data.settings[this.user.jid] || {}
//const isGroupLink = linkRegex.exec(m.text) 
let isGroupLink = linkRegex.test(m.text)
if (chat.antiLink2 && isGroupLink) {
if (chat.delete) return m.reply(mid.mAdvertencia + mid.mAntiDelete) 
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
if (m.text.includes(linkThisGroup)) return !0
}     
if (!isBotAdmin) return m.reply(mid.mAdvertencia + mid.mAdmin)
if (isBotAdmin) {
await conn.sendMessage(m.chat, { text: `${mid.mAdvertencia + mid.mWhatsApp2} *${user}*`, mentions: [m.sender] }, { quoted: m })    
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
let remove = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (remove[0].status === '404') return
}}
return !0
}
export default handler
