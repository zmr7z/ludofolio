(() => {
  async function sleep(ms){ await new Promise(r => setTimeout(r, ms)); }
  function selectEl(el){
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  function setText(el, text){
    selectEl(el);
    document.execCommand('insertText', false, text);
  }
  function norm(s){
    return (s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  }
  const reps = [
    ['前回、ブラウザゲームをゼロから公開するところまで書きました。', '前回は、ブラウザゲームをゼロから公開するところまで書きました。'],
    ['今回は その先 です。', '今回は、その先の話です。'],
    ['いまあるランを複製して、差分を1系統だけ足す方が早いです。', 'いまあるランを複製して、差分をひとつだけ足す方が早いです。'],
    ['第2作の核は一文です。', '第2作の核は、一文にするとこうなります。'],
    ['人気ランの型を調べて NEAR・倍率・序盤の安全帯・黄玉 も入れました。', '人気ランの型を調べて、NEAR・倍率・序盤の安全帯・黄玉も入れました。'],
    ['- ゼロから作らず、複製→差分1系統で第2作にする手順', '- ゼロから作らず、複製して差分をひとつで第2作にする手順'],
    ['- 「数値バフだけ」にしない、ルール書き換え型の強化の決め方', '- 「数値を少し上げる」だけにしない、ルールが変わる強化の決め方'],
    ['- 改造が「普通」に感じたときの直し方（ランの快感チェック）', '- 改造が「普通」に感じたときの直し方（ランの気持ちよさの点検）'],
    ['- AIへのお願い文（複製・遺物・快感の3段階）', '- AIへのお願い文（複製・遺物・気持ちよさの3段階）'],
    ['「改造の中身」に絞っています。', 'この記事では、「改造の中身」に絞ります。'],
    ['まず結論：第2作は「複製＋差分1系統」が早い', 'まず結論：第2作は「複製＋差分ひとつ」が早い'],
    ['2. 足すものは 1系統だけ決める（今回は遺物）', '2. 足すものは ひとつだけ決める（今回は遺物）'],
    ['4. 自分で遊んで「普通」なら、ジャンルの快感を足す', '4. 自分で遊んで「普通」なら、ランらしい気持ちよさを足す'],
    ['工程の目安: 核30分 / 複製すぐ / 遺物半日〜1日 / 快感直し半日 / 公開1時間前後', '工程の目安: 核30分 / 複製すぐ / 遺物半日〜1日 / 気持ちよさの直し半日 / 公開1時間前後'],
    ['ゼロ→公開は第1本。改造・差分・ローグはこの第2本。別ジャンルは第3本予定。', 'ゼロから公開までは第1本。改造・差分・ローグはこの第2本。別ジャンルは第3本予定です。'],
    ['サイト正面にはAI制作談やnote販売の話は出さない。', 'サイト正面には、AI制作談やnote販売の話は出しません。'],
    ['足す: ルール書き換え遺物 / 3選1×最大2回 / 死亡リセット / 元操作維持', '足す: ルール書き換え遺物 / 3つから1つ×最大2回 / 死亡リセット / 元操作維持'],
    ['ポイントは、複製したあと触る場所を1か所に限ること。', 'ポイントは、複製したあと触る場所を1か所に限ることです。'],
    ['元ファイルは変更しない。核（左右・障害・きぶん・深呼吸・即リトライ）は残す。', '元ファイルは変更しません。遊びの核（左右・障害・きぶん・深呼吸・すぐ再開）は残します。'],
    ['良い例: 横から来る / 左右逆 / 深呼吸＝無敵だがきぶん急上昇 / 被弾2回耐える', '良い例: 横から来る / 左右が逆 / 深呼吸＝無敵だがきぶん急上昇 / 被弾2回耐える'],
    ['選択: 開始直後3選1＋途中もう1回。死亡でリセット。', '選択: 開始直後に3つから1つ＋途中でもう1回。死亡でリセット。'],
    ['STEP4. 遊んで「普通」ならランの快感を足す', 'STEP4. 遊んで「普通」ならランの気持ちよさを足す'],
    ['遺物を足したあと「ルールは変わってるのにランとしての快感が普通」と感じた。', '遺物を足したあと、「ルールは変わっているのに、ランとしての気持ちよさが足りない」と感じました。'],
    ['人気ランの型で足りないところだけ足した。', '人気ランの型のうち、足りないところだけ足しました。'],
    ['- 近接成功で NEAR! と加点フロート、短いヒットストップ', '- 近接成功で NEAR! と加点表示、一瞬止まる演出'],
    ['- コンボ倍率をHUD表示（スコアにも使用）', '- コンボ倍率を画面に表示（スコアにも反映）'],
    ['- 開始約12秒の安全帯', '- 開始約12秒の安全な序盤'],
    ['- build / peak / breath の波', '- 盛り上げと息継ぎの波'],
    ['- 危険寄りの黄玉', '- 危険な位置にある黄玉'],
    ['元作にも同じ快感を入れると、第1作が古く見えない。', '元作にも同じ気持ちよさを入れると、第1作が古く見えにくくなります。'],
    ['STEP5. 入口に並べて公開', 'STEP5. 入口に並べて公開する'],
    ['Relics と Mood Rush を並べ、AI制作談はサイト正面に出さない。', 'Relics と Mood Rush を並べ、AI制作談はサイト正面に出しません。'],
    ['A. 効果が伝わらない → 一言説明＋通知＋死亡リセットを結果で繰り返す', 'A. 効果が伝わらない → 一言の説明＋通知＋「死亡でリセット」を結果で繰り返す'],
    ['B. 足したのに普通 → 新システム前にNEAR・倍率・序盤を点検', 'B. 足したのに普通 → 新しい仕組みの前にNEAR・倍率・序盤を点検'],
    ['E. 別コンセプトに逃げる → 改造連載は土台を同じに', 'E. 別コンセプトに逃げる → 改造連載では土台をそろえる'],
    ['元作が壊れていない / Relicsが別URL / 遺物で走り方が変わる / 死ぬと消える / NEARと倍率が見える / 序盤が理不尽でない / 入口から両作品へ進める', '元作が壊れていない / Relicsが別URL / 遺物で走り方が変わる / 死ぬと消える / NEARと倍率が見える / 序盤で理不尽に死ににくい / 入口から両作品へ進める'],
    ['2. 足す系統は1つ', '2. 足す差分はひとつ'],
    ['5. 普通ならジャンルの快感を足す', '5. 普通なら、ランらしい気持ちよさを足す'],
    ['6. サイトには遊ぶ導線だけ', '6. サイトには遊ぶ導線だけ置く'],
    ['ゼロからの公開手順は第1本をあわせて読むと迷いにくいです。', 'ゼロからの公開手順は、第1本をあわせて読むと迷いにくいです。']
  ];

  return (async () => {
    let changed = 0;
    const missed = [];
    for (const [from, to] of reps) {
      const nodes = [...document.querySelectorAll('.ProseMirror p, .ProseMirror h2, .ProseMirror h3, .ProseMirror li')];
      const el = nodes.find(n => norm(n.textContent) === norm(from));
      if (!el) { missed.push(from.slice(0, 40)); continue; }
      setText(el, to);
      changed++;
      await sleep(30);
    }

    // thank-you ending
    const paras = [...document.querySelectorAll('.ProseMirror p')];
    const hasThanks = paras.some(p => (p.textContent || '').includes('ここまで読んで'));
    if (!hasThanks) {
      const last = [...paras].reverse().find(p => norm(p.textContent));
      if (last) {
        const range = document.createRange();
        range.selectNodeContents(last);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('insertParagraph');
        document.execCommand('insertText', false, 'ここまで読んでくださり、ありがとうございました。');
        document.execCommand('insertParagraph');
        document.execCommand('insertText', false, '第2作づくりの参考になればうれしいです。');
        changed += 2;
      }
    }

    // polish 実物 line if present
    const real = [...document.querySelectorAll('.ProseMirror p')].find(p => norm(p.textContent).startsWith('実物:'));
    if (real) {
      setText(real, '実物はこちらです。');
      changed++;
    }

    return {
      changed,
      thanks: [...document.querySelectorAll('.ProseMirror p')].some(p => (p.textContent || '').includes('ここまで読んで')),
      missedCount: missed.length,
      missed: missed.slice(0, 12)
    };
  })();
})()
