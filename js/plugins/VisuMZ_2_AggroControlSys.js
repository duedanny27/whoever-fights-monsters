//=============================================================================
// VisuStella MZ - Aggro Control System
// VisuMZ_2_AggroControlSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AggroControlSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AggroControlSystem = VisuMZ.AggroControlSystem || {};
VisuMZ.AggroControlSystem.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.13] [AggroControlSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Aggro_Control_System_VisuStella_MZ
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A common mechanic found in many RPG's nowadays is the ability to steer the
 * way enemies target party members. This can be in the form of provocations, 
 * taunts, and aggro.
 *
 * Provocations come in the form of states, where when a unit applies a provoke
 * state on a target, the target must attack the provoker when using single
 * target skills. This plugin provides support for multiple provocations and
 * such provocations will be given focus based on the state's priority value.
 *
 * Taunts are a third way to steer an opponent to focus on a party member. The
 * taunt effects can be split up into global, physical, magical, or certain hit
 * only taunts and these can be applied to almost any trait object.
 *
 * Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Three different ways to influencing which targets enemies should attack:
 *   Provoke, taunt, and aggro.
 * * Provoke and taunt effects work both ways for actors and enemies.
 * * Aggro effects accumulate through battle and can be manipulated through
 *   notetag values, Plugin Commands, and/or Plugin Parameters.
 * * Provoked battlers can have provoke lines displayed to indicate which
 *   unit has provoked them.
 * * Taunting units can have animations played on them repeatedly to quickly
 *   relay information to the player about their taunt properties.
 * * Gauges that can be displayed over the heads of actor sprites to display
 *   how much aggro that actor holds in comparison to the other actors.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 * VisuMZ_1_BattleCore
 *
 * - Provoke Priority Lines and Taunt animations become available if these
 *   plugins are installed.
 *
 * ---
 *
 * ============================================================================
 * How Aggro, Provoke, and Taunts Work
 * ============================================================================
 *
 * This section will explain how aggro, provoke, and taunts work.
 *
 * ---
 *
 * Provoke
 *
 * - Provocations come in the form of states, where when a unit applies a
 * provoke state on a target, the target must attack the provoker when using
 * single target skills. This plugin provides support for multiple provocations
 * and such provocations will be given focus based on the state's database
 * priority value.
 *
 * - The provoke will last only as long as the duration of the state itself. If
 * the state's duration is refreshed by reapplying the Provoke state, then the
 * provoker of that state will then switch over to the one applying the newly
 * added state.
 *
 * - When an actor selects a target for an action and the actor is provoked by
 * an enemy on the other team, the player's choice selection becomes limited to
 * only the provoker.
 *
 * - Provoke can be bypassed through the <Bypass Provoke> notetag.
 *
 * ---
 *
 * Taunts
 *
 * - Taunts are a third way to steer an opponent to focus on a party member.
 * The taunt effects can be split up into global, physical, magical, or certain
 * hit only taunts and these can be applied to almost any trait object.
 *
 * - When an actor selects a target and the enemy team has a taunting unit,
 * the player's choice selection becomes limited to only the targets with the
 * associated taunt type.
 *
 * - Taunts can be bypassed through the <Bypass Taunt> notetag.
 *
 * ---
 *
 * Aggro
 *
 * - Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * - Skills and items can raise its user's aggro value through notetags and/or
 * how much damage they've dealt or healed. Skills and items can also change a
 * target's aggro value through notetags, too.
 *
 * - Through the Plugin Parameters, you can set Aggro to automatically raised
 * based on how much damage or healing dealt by a user.
 *
 * - Some enemies can be bypass forced aggro target through the <Bypass Aggro>
 * notetag while other enemies can be forced to target the highest aggro target
 * through the <Target Highest Aggro> notetag;
 *
 * ---
 *
 * Priorities
 *
 * - Priority will be given in the order of provokes, taunts, and then aggro.
 * This means if an enemy is provoked, the opposing side has a taunt, and there
 * is a member with high aggro, then the enemy will always attack the provoker
 * first before targeting a taunting unit before targeting the unit with high
 * aggro values.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Provoke-Related Notetags ===
 *
 * The following notetags enable you to utilize the Provoke effects added by
 * this plugin. Provoked targets can only attack the provoking unit for single
 * target actions.
 *
 * ---
 *
 * <Provoke>
 *
 * - Used for: State Notetags
 * - Causes the state affected unit to be able to only attack the caster of the
 *   provoke state for single target actions.
 * - If multiple provoke states are applied, then the provoker is the one who
 *   applied the highest priority provoke state.
 *
 * ---
 *
 * <Bypass Provoke>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Makes the affected unit to ignore any and all provoke effects applied by
 *   any provoke states, allowing them to target foes as if they are unaffected
 *   by provoke states altogether.
 *
 * ---
 * 
 * <Bypass Provoke>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass provoke effects applied by any provoke states,
 *   allowing this action to target foes as if the user is unaffected by any
 *   provoke effects altogether.
 * 
 * ---
 * 
 * <Provoke Height Origin: x%>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the provoke height origin point to x% of the sprite's height.
 * - This is the landing point for the provoke trails.
 * - Replace 'x' with a number presenting what rate of the sprite's height to
 *   set as the provoke height origin point.
 * 
 * ---
 *
 * === Taunt-Related Notetags ===
 *
 * ---
 *
 * <Taunt>
 * <All Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Physical Taunt>
 * <Magical Taunt>
 * <Certain Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions
 *   respectively.
 * - Add/remove any combination of the above to cause the affected unit to
 *   become the target of those types of actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Bypass Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The affected unit will ignore any and all taunt effects created by the
 *   opposing team, allowing them to use single target actions as if no
 *   taunters exist on the opposing team.
 *
 * ---
 * 
 * <Bypass Taunt>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass taunt effects created by the opposing team,
 *   allowing the user to use single target actions as if no taunters exist on
 *   the opposing team.
 * 
 * ---
 *
 * === Aggro-Related Notetags ===
 *
 * ---
 *
 * <User Aggro: +x>
 * <User Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the user's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <Target Aggro: +x>
 * <Target Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the target's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * <Aggro: +x>
 * <Aggro: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to passively have increased/decreased aggro
 *   values independent of the amount of aggro it earns in battle.
 * - Replace 'x' with the amount of aggro this object increases/decreases by.
 *
 * ---
 *
 * <Aggro Multiplier: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to increase the amount of perceived aggro it has
 *   by the aggro multiplier.
 * - Replace 'x' with a number representing the percentage to increase/decrease
 *   the perceived aggro by.
 * - If multiple of these traits exist across different trait objects, the
 *   effects are increased multiplicatively.
 *
 * ---
 *
 * <Bypass Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will decide targets by aggro weight
 *   instead of always picking the highest aggro unit(s).
 * - If used on trait objects, the affected unit will decide targets by aggro
 *   weight instead of always picking the highest aggro unit(s).
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 * 
 * <Bypass Highest Aggro>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass highest aggro effects and instead focuses on
 *   targets by aggro weight instead.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 * 
 * ---
 *
 * <Target Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will always decide its targets by
 *   the highest aggro value.
 * - If used on trait objects, the affected unit will always decide on targets
 *   by the highest aggro value.
 * - If the <Bypass Highest Aggro> notetag exists, this effect is ignored.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * === JavaScript Notetags: Aggro-Related ===
 *
 * ---
 *
 * <JS User Aggro>
 *  code
 *  code
 *  value = code
 * </JS User Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change the user's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <JS Target Aggro>
 *  code
 *  code
 *  value = code
 * </JS Target Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change target's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Aggro
 * - Changes target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Actor: Set Aggro
 * - Set target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Aggro
 * - Changes target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Enemy: Set Aggro
 * - Set target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Provoke Settings
 * ============================================================================
 *
 * The Provoke Settings Plugin Parameters adjust the visual aspects related to
 * the provoke effect. These settings will require VisuMZ_1_BattleCore to be
 * installed in order for them to work due to dependencies. 
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 *   Show Priority Lines?:
 *   - Show priority target lines for this plugin?
 *   - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Line Settings
 * 
 *   Arc Height:
 *   - How tall should the line arc in pixels?
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Height Origin:
 *   - The rate from the battler's sprite base to determine where the line
 *     starts from.
 * 
 *   Line Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Opacity:
 *   - The highest possible opacity for active provoke lines.
 * 
 *   Opacity Speed:
 *   - The speed at which opacity fluctuates for the line sprite.
 * 
 *   Parts:
 *   - The number of joint parts to split up the sprite as.
 * 
 *   Parts Size:
 *   - The number in pixels for the diameter of each part.
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Provoke Origin' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Taunt Settings
 * ============================================================================
 *
 * Battlers with specific taunt types can have animations playing on them over
 * and over to relay information to the player. These settings require you to
 * have both VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore installed in your
 * project's plugin list in order to use.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine & VisuMZ_1_BattleCore
 * 
 *   Show Animations?:
 *   - Show animations for each of the taunt effects?
 *   - Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Animation ID's
 * 
 *   Physical Taunt:
 *   - The animation ID used for physical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Magical Taunt:
 *   - The animation ID used for magical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Certain Hit Taunt:
 *   - The animation ID used for certain hit taunts.
 *   - Use 0 or 'None' to bypass this type.
 *
 * ---
 *
 * Animation Settings
 * 
 *   Cycle Time:
 *   - The amount of frames to wait before each animation cycle.
 *   - WARNING: Lower numbers can jeopardize game performance.
 * 
 *   Mirror Actor Ani?:
 *   - Mirror animations played on actors?
 * 
 *   Mute Animation SFX?:
 *   - Mute sounds played by animations?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Aggro Settings
 * ============================================================================
 *
 * This lets you adjust the settings for this plugin's Aggro mechanics. Most of
 * these settings focus on the visual gauge display of the Aggro gauge, but you
 * can also change up the settings for how aggro is utilized.
 *
 * ---
 *
 * General
 * 
 *   Priority: Highest TGR:
 *   - When enemies target actors for an single target attack, always target
 *     the highest members or make it weighted?
 *
 *   Aggro Per Damage:
 *   - The amount of aggro generated per point of HP damage dealt to an enemy.
 *
 *   Aggro Per Heal:
 *   - The amount of aggro generated per point of HP recovered to an ally.
 *
 * ---
 *
 * Gauge
 * 
 *   Visible Battler Gauge:
 *   - Display an aggro gauge over an SV actor's head to show current aggro
 *     level compared to other party members.
 * 
 *   Visible Status Gauge:
 *   - Display an aggro gauge in the Battle Status Window to show the current
 *     aggro level compared to others.
 * 
 *   Gauge Color 1:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Width:
 *   - Width in pixels you want the gauge to be.
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the Aggro Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the Aggro Gauge to be scaled?
 * 
 *   Battler Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 * 
 *   Battle Status Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Aggro Gauge' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.13: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a problem that would cause a crash when exiting the Options menu in
 *    battle when used with specific battle systems. Fix made by Irina.
 * 
 * Version 1.12: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for Battle Core updated version 1.73
 *    new features.
 * 
 * Version 1.11: November 17, 2022
 * * Bug Fixes!
 * ** <JS User Aggro> and <JS Target Aggro> should now work properly.
 *    Fix made by Arisu.
 * 
 * Version 1.10: August 25, 2022
 * * Documentation Update!
 * ** Added note to the <Provoke> notetag:
 * *** States with <Provoke> on them will automatically remove themselves if
 *     the provoker dies. Update made by Arisu.
 * * Feature Update!
 * ** States with <Provoke> on them will automatically remove themselves if the
 *    provoker dies. Update made by Arisu.
 * 
 * Version 1.09: June 2, 2022
 * * Bug Fixes!
 * ** Filename has been shortened from VisuMZ_2_AggroControlSystem.js to
 *    VisuMZ_2_AggroControlSys.js due to deployment reasons. For some mobile
 *    devices, keeping the name as long as VisuMZ_2_AggroControlSystem.js
 *    causes problems, but VisuMZ_2_AggroControlSys.js is fine. Take note of
 *    this while you are updating.
 * ** 'user' and 'target' now works properly with the JS notetags.
 *    Fix made by Irina.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Highest and lowest TGR members are now cached on an action by action
 *    basis for reduce needed computations. Update made by Irina.
 * 
 * Version 1.07: April 9, 2021
 * * Bug Fixes!
 * ** Provoke effect now takes into consideration when Provoke is applied by
 *    a weapon effect that comes off a counter attack from an actor. Fix made
 *    by Olivia.
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Subsequent battles or changing scenes should no longer clear the custom
 *    rendered bitmap used for the provoke trail. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for the Skill and Item versions of the following
 *    notetags into the help file and wiki:
 * *** <Bypass Provoke>
 * *** <Bypass Taunt>
 * *** <Bypass Highest Aggro>
 * 
 * Version 1.05: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Aggro Settings > Battle Status Gauge
 * **** These settings allow you to offset the Aggro Gauge in the Battle Status
 *      Window from its original position.
 * 
 * Version 1.04: February 26, 2021
 * * Bug Fixes!
 * ** Fixed positioning of gauge for List Style battle layouts without faces.
 *    Fix made by Olivia.
 * 
 * Version 1.03: February 5, 2021
 * * Feature Update!
 * ** Aggro is now cleared at the end of each battle in addition to the start
 *    of each battle. Update made by Olivia.
 *
 * Version 1.02: November 1, 2020
 * * Compatibility Update!
 * ** Plugin is made more compatible with other plugins.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Provoke lines should now be placed correctly if the UI area is smaller
 *    than the resolution area.
 * ** The Plugin Commands should no longer cause crashes. Fix made by Irina.
 *
 * Version 1.00: September 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeAggro
 * @text Actor: Change Aggro
 * @desc Changes target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSetAggro
 * @text Actor: Set Aggro
 * @desc Set target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeAggro
 * @text Enemy: Change Aggro
 * @desc Changes target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySetAggro
 * @text Enemy: Set Aggro
 * @desc Set target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AggroControl
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Provoke:struct
 * @text Provoke Settings
 * @type struct<Provoke>
 * @desc Settings related to the Provoke mechanic.
 * These settings require VisuMZ_1_BattleCore.
 * @default {"VisuMZ_1_BattleCore":"","ShowLines:eval":"true","LineSettings":"","ArcHeight:num":"125","BlendMode:num":"1","HeightOrigin:num":"0.8","LineColor:str":"#ff0000","Opacity:num":"255","OpacitySpeed:num":"4","Parts:num":"256","PartsSize:num":"5","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Provoke Origin"}
 *
 * @param Taunt:struct
 * @text Taunt Settings
 * @type struct<Taunt>
 * @desc Settings related to the Taunt mechanic.
 * @default {"Dependency":"VisuMZ_1_BattleCore","ShowAnimation:eval":"true","AnimationID":"","AniPhysical:num":"1","AniMagical:num":"2","AniCertain:num":"3","AnimationSettings":"","CycleTime:num":"60","MirrorActorAni:eval":"true","MuteAnimations:eval":"true"}
 *
 * @param Aggro:struct
 * @text Aggro Settings
 * @type struct<Aggro>
 * @desc Settings related to the Aggro mechanic.
 * @default {"General":"","PriorityHighest:eval":"true","AggroPerDmg:num":"0.1","AggroPerHeal:num":"0.5","Gauge":"","VisibleGauge:eval":"false","StatusGauge:eval":"true","GaugeColor1:str":"#959595","GaugeColor2:str":"#ffffff","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"+0","OffsetY:num":"+2","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Aggro Gauge"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Provoke Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Provoke:
 *
 * @param VisuMZ_1_BattleCore
 *
 * @param ShowLines:eval
 * @text Show Priority Lines?
 * @parent VisuMZ_1_BattleCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show priority target lines for this plugin?
 * Requires VisuMZ_1_BattleCore.
 * @default true
 *
 * @param LineSettings
 * @text Line Settings
 *
 * @param ArcHeight:num
 * @text Arc Height
 * @parent LineSettings
 * @type number
 * @desc How tall should the line arc in pixels?
 * @default 125
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent LineSettings
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param HeightOrigin:num
 * @text Height Origin
 * @parent LineSettings
 * @desc The rate from the battler's sprite base to determine where the line starts from.
 * @default 0.8
 *
 * @param LineColor:str
 * @text Line Color
 * @parent LineSettings
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ff0000
 *
 * @param Opacity:num
 * @text Opacity
 * @parent LineSettings
 * @type number
 * @min 1
 * @max 255
 * @desc The highest possible opacity for active provoke lines.
 * @default 255
 *
 * @param OpacitySpeed:num
 * @text Opacity Speed
 * @parent Opacity:num
 * @type number
 * @min 1
 * @desc The speed at which opacity fluctuates for the line sprite.
 * @default 4
 *
 * @param Parts:num
 * @text Parts
 * @parent LineSettings
 * @type number
 * @min 1
 * @desc The number of joint parts to split up the sprite as.
 * @default 256
 *
 * @param PartsSize:num
 * @text Parts Size
 * @parent Parts:num
 * @type number
 * @min 1
 * @desc The number in pixels for the diameter of each part.
 * @default 5
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Provoke Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Provoke Origin' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Provoke Origin
 *
 */
/* ----------------------------------------------------------------------------
 * Taunt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Taunt:
 *
 * @param Dependency
 * @text VisuMZ_0_CoreEngine
 * @default VisuMZ_1_BattleCore
 *
 * @param ShowAnimation:eval
 * @text Show Animations?
 * @parent Dependency
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show animations for each of the taunt effects?
 * Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 * @default true
 *
 * @param AnimationID
 * @text Animation ID's
 *
 * @param AniPhysical:num
 * @text Physical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for physical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 13
 *
 * @param AniMagical:num
 * @text Magical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for magical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 14
 *
 * @param AniCertain:num
 * @text Certain Hit Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for certain hit taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 15
 *
 * @param AnimationSettings
 * @text Animation Settings
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent AnimationSettings
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 60
 *
 * @param MirrorActorAni:eval
 * @text Mirror Actor Ani?
 * @parent AnimationSettings
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations played on actors?
 * @default true
 *
 * @param MuteAnimations:eval
 * @text Mute Animation SFX?
 * @parent AnimationSettings
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute sounds played by animations?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Aggro Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Aggro:
 *
 * @param General
 *
 * @param PriorityHighest:eval
 * @text Priority: Highest TGR
 * @parent General
 * @type boolean
 * @on Always
 * @off Weighted
 * @desc When enemies target actors for an single target attack,
 * always target the highest members or make it weighted?
 * @default true
 *
 * @param AggroPerDmg:num
 * @text Aggro Per Damage
 * @parent General
 * @desc The amount of aggro generated per point of HP damage dealt to an enemy.
 * @default 0.1
 *
 * @param AggroPerHeal:num
 * @text Aggro Per Heal
 * @parent General
 * @desc The amount of aggro generated per point of HP recovered to an ally.
 * @default 0.5
 *
 * @param Gauge
 *
 * @param VisibleGauge:eval
 * @text Visible Battler Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge over an SV actor's head to show
 * current aggro level compared to other party members.
 * @default false
 *
 * @param StatusGauge:eval
 * @text Visible Status Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge in the Battle Status Window
 * to show the current aggro level compared to others.
 * @default true
 *
 * @param GaugeColor1:str
 * @text Gauge Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #959595
 *
 * @param GaugeColor2:str
 * @text Gauge Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Gauge
 * @desc How large/small do you want the Aggro Gauge to be scaled?
 * @default 0.5
 * 
 * @param BattlerGauge
 * @text Battler Gauge
 * @parent Gauge
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param BattleStatus
 * @text Battle Status Gauge
 * @parent Gauge
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Aggro Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Aggro Gauge
 *
 */
//=============================================================================

const _0x244290=_0x51a2;function _0x2498(){const _0xaf6850=['_menuAggroType','isSceneBattle','executeHpDamageAggroControl','onBattleStart','Sprite_Actor_update','iconWidth','Sprite_Battler_update','registerCommand','fnucb','HITTYPE_PHYSICAL','ARRAYSTRUCT','ARRAYSTR','AdjustOptionsRect','addCommand','isTpb','updateAggroGaugeSprite','loseAggro','initAggroControl','scale','highestTgrMember','_physicalTauntAnimation','shift','setHandler','1218947dFjbTZ','VisuMZ_0_CoreEngine','isPlaytest','concat','isAggroAffected','VisuMZ_1_BattleCore','bypassProvoke','nxRqU','Frqhx','name','itemRectWithPadding','BattleManager_invokeMagicReflection','removeDeadProvokerStates','reduce','_customModified','_aggro','_statusWindow','maxCommands','provokeHeightOrigin','MKTCy','Spriteset_Battle_update','_mainSprite','giwZt','aggroMultiplier','Sprite_Gauge_gaugeRate','convertStringToBattleTarget','oKJZM','Game_Battler_onBattleStart','isPhysical','PfOPS','updateAggroControl','boxHeight','initialize','Game_BattlerBase_initMembers','Sprite_Gauge_drawValue','gaugeHeight','applyData','placeGauge','stateHasProvoke','ConvertParams','taunting','visible','log','_enemies','_%1TauntAnimation','Sprite_Gauge_currentMaxValue','magical','%1Taunt','bypassHighestAggro','yeiKg','padding','Provoke','BattleLayout','wsTyC','prototype','makeProvokeTarget','max','randomTauntTarget','Sprite_Actor_createStateSprite','drawAggroGauge','requestFauxAnimation','Parts','Sprite_Battler_setBattler','Taunt','anchor','Game_Action_executeHpDamage','map','bitmapWidth','abs','isAlive','actor','sHQKv','gaugeColor1','description','onBattleEnd','bind','1565977YnUPcO','ShowAnimation','Spriteset_Battle_createBattleField','Window_Options_addGeneralOptions','gainAggro','_targetIndex','inputtingAction','certainHitTauntMembers','RUxVn','isEnemy','STR','alwaysTargetHighestAggro','gzwaL','findTgrMember','updateOpacity','physicalTaunt','inBattle','lSesn','gaugeX','OffsetX','setup','BattleManager_endAction','placeActorName','_mirrorActorTauntAnimations','EnemyIndex','updateTauntAnimations','2605yovpJs','addGeneralOptions','AniCertain','setBattler','provokeLineColor','length','aggroGauge','endAction','isShowPriorityLines','call','scope','provokeBitmap','currentValue','time','provoker','addState','ActorSetAggro','addChild','partsSize','EnemySetAggro','_battler','clearTgrCache','getColor','aggroGaugeY','faceWidth','Game_Battler_addState','Game_BattlerBase_refresh','getColorDataFromPluginParameters','sortEnemies','ShowLines','ilRZt','aSyOM','_provoker','matchTauntType','width','AnchorY','isAtbGaugeVisible','maxOpacity','push','Game_Battler_onBattleEnd','_spriteset','_provokeContainer','gODRh','createBattleFieldAggroControl','index','_scene','_muteTauntAnimations','Sprite_Gauge_gaugeColor1','createStateSprite','VisuMZ_2_BattleSystemATB','refresh','hitType','constructor','isMagical','_homeX','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','tgrMax','leftwardAnimation','target','convertBattleTargetToString','currentValueAggroControl','OffsetY','update','pow','isForAnyone','SJqOI','10998LbQEJY','_homeY','baseAggro','isSideView','friendsUnit','_counterAttackingTarget','startNewTauntAnimation','textColor','VMItL','note','isTauntAffected','battleAggro','value','ActorChangeAggro','opacity','isProvokeAffected','ARRAYJSON','_damageContainer','pagedown','updateBattlerPositions','isAggroGaugeShown','canSingleOrMultipleSelect','MuteAnimations','_animationCycleTime','aggroGaugeX','applySubjectAggro','createProvokeSprite','isTargetHighestTGR','match','ConfigManager_makeData','initMembers','UwIwX','battleUIOffsetY','AddOption','40rrXYWh','gaugeColor2','applyItemUserEffect','applyProvokeEffect','sparam','Sprite_Battler_initialize','setFrame','ConfigManager_applyData','HITTYPE_CERTAIN','_tauntAnimationTimer','zqvId','isBypassHighestAggro','xqMSm','magicalTauntMembers','AniPhysical','PriorityHighest','UIUdf','Battle\x20Enemy\x20%1','UdhPH','randomInt','RyFsk','tgr','clearProvokers','EVAL','applyGlobal','NJpfW','_targetX','targetsForAlive','maxSprites','LgloS','format','includes','subject','arcHeight','gIHHl','exit','bypassTaunt','createBattleField','isDead','boxWidth','isAggroType','drawValue','getSpecificBattlerKeyTarget','blendMode','children','Opacity','_sprites','apSyT','getNextTauntAnimation','tgrMin','placeAggroGauge','physicalTauntMembers','CQbVW','Settings','OptionName','ARRAYNUM','STRUCT','CeknI','smoothTarget','Window_BattleEnemy_refresh','enemy','AnchorX','ActorID','applyItemUserEffectAggroControl','clearAggro','showVisualAtbGauge','createChildSprites','Scene_Options_maxCommands','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Aggro','status','273vtlwni','xiUlQ','isBypassProvoke','bitmapHeight','ucpXj','setAggro','tIAQx','currentMaxValueAggroControl','parentContainer','EGzSC','addAggroControlSystemCommands','UmxBb','item','addAggroControlSystemAggroCommand','some','needsSelection','32769340vOGlAc','orfCr','addAggroControlSystemProvokeCommand','GaugeColor1','Sprite_Gauge_gaugeColor2','createInnerSprite','removeState','min','battleLayoutStyle','list','trim','_targetY','Game_BattlerBase_sparam','battler','optDisplayTp','LineColor','_certainHitTauntAnimation','gaugeRate','aggro','DYdXa','HITTYPE_MAGICAL','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Scale','_provokeBitmap','_subject','aggro-gauge-color-1','initTauntAnimations','fGTmO','11414817pPhqVD','certainHitTaunt','createProvokeHeightOrigin','_highestTgrMember','_lowestTgrMember','Game_Action_getSpecificBattlerKeyTarget','_opacitySpeed','createAggroGauge','iKYVI','oewTT','dhgtD','_tauntAnimationCycle','xyQyC','OpacitySpeed','makeData','BattleStatusOffsetY','BNcGU','Sprite_Battler_initMembers','_battleField','certainHit','_aggroGaugeSprite','actorId','Game_Action_applyItemUserEffect','nHTOu','AXyym','rKIAm','addChildAt','invokeMagicReflection','2203658jDIlcG','randomTarget','isCertainHit','VfOnD','updateChildrenOpacity','goNlX','67648UMUHuq','Game_Action_applyGlobal','user','traitObjects','filter','invokeCounterAttack','BattleStatusOffsetX','height','round','isActor','AggroControlSystem','isBypassTaunt','selectAllActors','updateOpacityAggroControl','snbVN','StatusGauge','MkdgG','bitmap','members','states','zIfBX','EoBPG','itemRect','updateSubPositions','BattleManager_invokeCounterAttack','provokeOrigin','FUNC','tauntTargetsForAlive','Sprite_Gauge_gaugeX','VuqZh','QThlo','lqQYb','opponentsUnit','actor%1-gauge-aggro','executeHpDamage','_colorCache','Sprite_Gauge_update','CLidM','nameX','applyProvokeFilters','HeightOrigin','lowestTgrMember','AnJfs','aggroGaugeColor1','CycleTime','_statusType','provoke-line-color','magicalTaunt','Sprite_Gauge_currentValue','parse','_cache','aliveMembers','JSON','Window_StatusBase_placeActorName'];_0x2498=function(){return _0xaf6850;};return _0x2498();}(function(_0x51a374,_0x1e96d7){const _0x167113=_0x51a2,_0x29059b=_0x51a374();while(!![]){try{const _0xf44165=-parseInt(_0x167113(0x2fa))/0x1+parseInt(_0x167113(0x2a7))/0x2+parseInt(_0x167113(0x25f))/0x3*(-parseInt(_0x167113(0x2ad))/0x4)+parseInt(_0x167113(0x360))/0x5*(-parseInt(_0x167113(0x1f6))/0x6)+-parseInt(_0x167113(0x346))/0x7*(parseInt(_0x167113(0x218))/0x8)+parseInt(_0x167113(0x28b))/0x9+parseInt(_0x167113(0x26f))/0xa;if(_0xf44165===_0x1e96d7)break;else _0x29059b['push'](_0x29059b['shift']());}catch(_0x5e0507){_0x29059b['push'](_0x29059b['shift']());}}}(_0x2498,0xc71e5));var label=_0x244290(0x2b7),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x244290(0x2b1)](function(_0x2bd4f5){const _0x1c18c0=_0x244290;return _0x2bd4f5[_0x1c18c0(0x25e)]&&_0x2bd4f5[_0x1c18c0(0x343)][_0x1c18c0(0x237)]('['+label+']');})[0x0];VisuMZ[label][_0x244290(0x24d)]=VisuMZ[label][_0x244290(0x24d)]||{},VisuMZ[_0x244290(0x321)]=function(_0x5ce171,_0x348594){const _0x4d1715=_0x244290;for(const _0x111c34 in _0x348594){if(_0x111c34['match'](/(.*):(.*)/i)){const _0x3a513c=String(RegExp['$1']),_0x1d90a8=String(RegExp['$2'])['toUpperCase']()[_0x4d1715(0x279)]();let _0x1d0996,_0x42991a,_0x51b2e8;switch(_0x1d90a8){case'NUM':_0x1d0996=_0x348594[_0x111c34]!==''?Number(_0x348594[_0x111c34]):0x0;break;case _0x4d1715(0x24f):_0x42991a=_0x348594[_0x111c34]!==''?JSON[_0x4d1715(0x2de)](_0x348594[_0x111c34]):[],_0x1d0996=_0x42991a[_0x4d1715(0x33c)](_0x132893=>Number(_0x132893));break;case _0x4d1715(0x22f):_0x1d0996=_0x348594[_0x111c34]!==''?eval(_0x348594[_0x111c34]):null;break;case'ARRAYEVAL':_0x42991a=_0x348594[_0x111c34]!==''?JSON[_0x4d1715(0x2de)](_0x348594[_0x111c34]):[],_0x1d0996=_0x42991a[_0x4d1715(0x33c)](_0x10c63b=>eval(_0x10c63b));break;case _0x4d1715(0x2e1):_0x1d0996=_0x348594[_0x111c34]!==''?JSON[_0x4d1715(0x2de)](_0x348594[_0x111c34]):'';break;case _0x4d1715(0x206):_0x42991a=_0x348594[_0x111c34]!==''?JSON['parse'](_0x348594[_0x111c34]):[],_0x1d0996=_0x42991a['map'](_0x16ddaa=>JSON[_0x4d1715(0x2de)](_0x16ddaa));break;case _0x4d1715(0x2c7):_0x1d0996=_0x348594[_0x111c34]!==''?new Function(JSON['parse'](_0x348594[_0x111c34])):new Function('return\x200');break;case'ARRAYFUNC':_0x42991a=_0x348594[_0x111c34]!==''?JSON[_0x4d1715(0x2de)](_0x348594[_0x111c34]):[],_0x1d0996=_0x42991a[_0x4d1715(0x33c)](_0x224359=>new Function(JSON[_0x4d1715(0x2de)](_0x224359)));break;case _0x4d1715(0x350):_0x1d0996=_0x348594[_0x111c34]!==''?String(_0x348594[_0x111c34]):'';break;case _0x4d1715(0x2ee):_0x42991a=_0x348594[_0x111c34]!==''?JSON[_0x4d1715(0x2de)](_0x348594[_0x111c34]):[],_0x1d0996=_0x42991a[_0x4d1715(0x33c)](_0xac0ea5=>String(_0xac0ea5));break;case _0x4d1715(0x250):_0x51b2e8=_0x348594[_0x111c34]!==''?JSON[_0x4d1715(0x2de)](_0x348594[_0x111c34]):{},_0x1d0996=VisuMZ[_0x4d1715(0x321)]({},_0x51b2e8);break;case _0x4d1715(0x2ed):_0x42991a=_0x348594[_0x111c34]!==''?JSON[_0x4d1715(0x2de)](_0x348594[_0x111c34]):[],_0x1d0996=_0x42991a[_0x4d1715(0x33c)](_0x479754=>VisuMZ[_0x4d1715(0x321)]({},JSON[_0x4d1715(0x2de)](_0x479754)));break;default:continue;}_0x5ce171[_0x3a513c]=_0x1d0996;}}return _0x5ce171;},(_0x4e205f=>{const _0x2091ef=_0x244290,_0x49d044=_0x4e205f['name'];for(const _0x50e86c of dependencies){if(!Imported[_0x50e86c]){alert(_0x2091ef(0x1eb)['format'](_0x49d044,_0x50e86c)),SceneManager[_0x2091ef(0x23b)]();break;}}const _0x21cc79=_0x4e205f[_0x2091ef(0x343)];if(_0x21cc79[_0x2091ef(0x212)](/\[Version[ ](.*?)\]/i)){const _0x290c9b=Number(RegExp['$1']);_0x290c9b!==VisuMZ[label]['version']&&(alert(_0x2091ef(0x25c)[_0x2091ef(0x236)](_0x49d044,_0x290c9b)),SceneManager['exit']());}if(_0x21cc79[_0x2091ef(0x212)](/\[Tier[ ](\d+)\]/i)){if(_0x2091ef(0x231)!=='NJpfW')return this[_0x2091ef(0x240)]()?this[_0x2091ef(0x1f0)]():_0x63bda6[_0x2091ef(0x2b7)][_0x2091ef(0x2dd)][_0x2091ef(0x369)](this);else{const _0x32d52c=Number(RegExp['$1']);if(_0x32d52c<tier)alert(_0x2091ef(0x284)['format'](_0x49d044,_0x32d52c,tier)),SceneManager[_0x2091ef(0x23b)]();else{if(_0x2091ef(0x1fe)!==_0x2091ef(0x1fe))return[_0x3a6eb9];else tier=Math[_0x2091ef(0x332)](_0x32d52c,tier);}}}VisuMZ['ConvertParams'](VisuMZ[label][_0x2091ef(0x24d)],_0x4e205f['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x244290(0x303)],_0x244290(0x203),_0x29ee0b=>{const _0x312a61=_0x244290;if(!$gameParty['inBattle']())return;VisuMZ[_0x312a61(0x321)](_0x29ee0b,_0x29ee0b);const _0x133045=$gameActors[_0x312a61(0x340)](_0x29ee0b[_0x312a61(0x256)]),_0x3c2707=_0x29ee0b[_0x312a61(0x25d)];if(_0x133045)_0x133045[_0x312a61(0x34a)](_0x3c2707);}),PluginManager['registerCommand'](pluginData['name'],_0x244290(0x370),_0x5a1cdf=>{const _0xf85d01=_0x244290;if(!$gameParty[_0xf85d01(0x356)]())return;VisuMZ[_0xf85d01(0x321)](_0x5a1cdf,_0x5a1cdf);const _0x1cbb58=$gameActors[_0xf85d01(0x340)](_0x5a1cdf[_0xf85d01(0x256)]),_0x2875d6=_0x5a1cdf[_0xf85d01(0x25d)];if(_0x1cbb58)_0x1cbb58[_0xf85d01(0x264)](_0x2875d6);}),PluginManager[_0x244290(0x2ea)](pluginData[_0x244290(0x303)],'EnemyChangeAggro',_0x1827c9=>{const _0x30178d=_0x244290;if(!$gameParty[_0x30178d(0x356)]())return;VisuMZ[_0x30178d(0x321)](_0x1827c9,_0x1827c9);const _0xf6adf6=$gameTroop[_0x30178d(0x2bf)]()[_0x1827c9[_0x30178d(0x35e)]],_0x11b092=_0x1827c9[_0x30178d(0x25d)];if(_0xf6adf6)_0xf6adf6[_0x30178d(0x34a)](_0x11b092);}),PluginManager[_0x244290(0x2ea)](pluginData['name'],_0x244290(0x373),_0x129240=>{const _0x3b673e=_0x244290;if(!$gameParty[_0x3b673e(0x356)]())return;VisuMZ['ConvertParams'](_0x129240,_0x129240);const _0x2ed7b9=$gameTroop[_0x3b673e(0x2bf)]()[_0x129240[_0x3b673e(0x35e)]],_0x1dbc6c=_0x129240['Aggro'];if(_0x2ed7b9)_0x2ed7b9[_0x3b673e(0x264)](_0x1dbc6c);}),DataManager['stateHasProvoke']=function(_0x6a62c){const _0x46946a=_0x244290;if(!_0x6a62c)return![];return _0x6a62c['note'][_0x46946a(0x212)](/<PROVOKE>/i);},DataManager[_0x244290(0x261)]=function(_0x1773fd){const _0x4c95cf=_0x244290;if(!_0x1773fd)return![];return _0x1773fd[_0x4c95cf(0x1ff)][_0x4c95cf(0x212)](/<BYPASS PROVOKE>/i);},DataManager[_0x244290(0x2b8)]=function(_0x5bde2e){const _0x422260=_0x244290;if(!_0x5bde2e)return![];return _0x5bde2e[_0x422260(0x1ff)][_0x422260(0x212)](/<BYPASS TAUNT>/i);},DataManager[_0x244290(0x223)]=function(_0x57cf2c){const _0x2d8634=_0x244290;if(!_0x57cf2c)return![];return _0x57cf2c[_0x2d8634(0x1ff)][_0x2d8634(0x212)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},DataManager[_0x244290(0x351)]=function(_0x36274f){const _0x5a081a=_0x244290;if(!_0x36274f)return![];return _0x36274f[_0x5a081a(0x1ff)]['match'](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},ImageManager['provokeBitmap']=function(){const _0x3378ae=_0x244290;if(this[_0x3378ae(0x286)])return this['_provokeBitmap'];return this[_0x3378ae(0x286)]=new Bitmap(0x64,0x64),this['_provokeBitmap']['drawCircle'](0x32,0x32,0x32,ColorManager[_0x3378ae(0x364)]()),this[_0x3378ae(0x286)][_0x3378ae(0x308)]=![],this['_provokeBitmap'];},ConfigManager[_0x244290(0x366)]=!![],ConfigManager[_0x244290(0x2c6)]=!![],VisuMZ[_0x244290(0x2b7)][_0x244290(0x213)]=ConfigManager[_0x244290(0x299)],ConfigManager['makeData']=function(){const _0x490af6=_0x244290,_0x34976e=VisuMZ[_0x490af6(0x2b7)][_0x490af6(0x213)][_0x490af6(0x369)](this);return _0x34976e[_0x490af6(0x366)]=this[_0x490af6(0x366)],_0x34976e[_0x490af6(0x2c6)]=this['provokeOrigin'],_0x34976e;},VisuMZ[_0x244290(0x2b7)][_0x244290(0x21f)]=ConfigManager[_0x244290(0x31e)],ConfigManager['applyData']=function(_0x4be887){const _0x17c64e=_0x244290;VisuMZ[_0x17c64e(0x2b7)][_0x17c64e(0x21f)][_0x17c64e(0x369)](this,_0x4be887);if(_0x17c64e(0x366)in _0x4be887)this[_0x17c64e(0x366)]=_0x4be887['aggroGauge'];else{if(_0x17c64e(0x2eb)!==_0x17c64e(0x2eb)){const _0x31cf7a=_0x17c64e(0x288);this[_0x17c64e(0x2d0)]=this[_0x17c64e(0x2d0)]||{};if(this[_0x17c64e(0x2d0)][_0x31cf7a])return this['_colorCache'][_0x31cf7a];const _0x405017=_0x9b17be['AggroControlSystem'][_0x17c64e(0x24d)][_0x17c64e(0x25d)][_0x17c64e(0x272)];return this[_0x17c64e(0x1cf)](_0x31cf7a,_0x405017);}else this[_0x17c64e(0x366)]=!![];}_0x17c64e(0x2c6)in _0x4be887?this[_0x17c64e(0x2c6)]=_0x4be887[_0x17c64e(0x2c6)]:this[_0x17c64e(0x2c6)]=!![];},TextManager['aggroGauge']=VisuMZ['AggroControlSystem'][_0x244290(0x24d)]['Aggro'][_0x244290(0x24e)],TextManager[_0x244290(0x2c6)]=VisuMZ[_0x244290(0x2b7)][_0x244290(0x24d)]['Provoke'][_0x244290(0x24e)],ColorManager[_0x244290(0x1cf)]=function(_0x194fa2,_0x570787){const _0x31a40a=_0x244290;_0x570787=String(_0x570787),this[_0x31a40a(0x2d0)]=this[_0x31a40a(0x2d0)]||{};if(_0x570787['match'](/#(.*)/i))_0x31a40a(0x270)!=='JoPFq'?this[_0x31a40a(0x2d0)][_0x194fa2]='#%1'['format'](String(RegExp['$1'])):(_0x5da167[_0x31a40a(0x330)][_0x31a40a(0x1f2)][_0x31a40a(0x369)](this),this[_0x31a40a(0x209)](),this[_0x31a40a(0x2c4)](),this[_0x31a40a(0x354)](),this['updateChildrenOpacity']());else{if(_0x31a40a(0x2a4)!==_0x31a40a(0x2a4))return _0x4af43f['AggroControlSystem'][_0x31a40a(0x2dd)][_0x31a40a(0x369)](this);else this[_0x31a40a(0x2d0)][_0x194fa2]=this[_0x31a40a(0x1fd)](Number(_0x570787));}return this[_0x31a40a(0x2d0)][_0x194fa2];},ColorManager[_0x244290(0x376)]=function(_0x15a81c){const _0x2e6b11=_0x244290;_0x15a81c=String(_0x15a81c);if(_0x15a81c[_0x2e6b11(0x212)](/#(.*)/i)){if(_0x2e6b11(0x293)===_0x2e6b11(0x301)){if(!_0x338722)return null;if(_0x514681['match'](/BATTLE ACTOR (\d+)/i))return _0x4c70fe[_0x2e6b11(0x340)](_0xd81719(_0x8c9d74['$1']));else{if(_0x57bebf[_0x2e6b11(0x212)](/BATTLE ENEMY (\d+)/i))return _0x5852fb['members']()[_0x150778(_0x5f20b1['$1'])];}return null;}else return'#%1'[_0x2e6b11(0x236)](String(RegExp['$1']));}else return this[_0x2e6b11(0x1fd)](Number(_0x15a81c));},ColorManager[_0x244290(0x364)]=function(){const _0x38c69e=_0x244290,_0x578aa3=_0x38c69e(0x2db);this[_0x38c69e(0x2d0)]=this[_0x38c69e(0x2d0)]||{};if(this[_0x38c69e(0x2d0)][_0x578aa3])return this['_colorCache'][_0x578aa3];const _0x1d6734=VisuMZ[_0x38c69e(0x2b7)][_0x38c69e(0x24d)]['Provoke']['LineColor'];return this[_0x38c69e(0x1cf)](_0x578aa3,_0x1d6734);},ColorManager[_0x244290(0x2d8)]=function(){const _0x5eb784=_0x244290,_0x14e8ab=_0x5eb784(0x288);this[_0x5eb784(0x2d0)]=this['_colorCache']||{};if(this[_0x5eb784(0x2d0)][_0x14e8ab])return this['_colorCache'][_0x14e8ab];const _0x54bf90=VisuMZ['AggroControlSystem']['Settings']['Aggro'][_0x5eb784(0x272)];return this[_0x5eb784(0x1cf)](_0x14e8ab,_0x54bf90);},ColorManager['aggroGaugeColor2']=function(){const _0x41146d=_0x244290,_0x265001='aggro-gauge-color-2';this['_colorCache']=this['_colorCache']||{};if(this[_0x41146d(0x2d0)][_0x265001])return this['_colorCache'][_0x265001];const _0x1ecf86=VisuMZ['AggroControlSystem'][_0x41146d(0x24d)]['Aggro']['GaugeColor2'];return this[_0x41146d(0x1cf)](_0x265001,_0x1ecf86);},SceneManager[_0x244290(0x2e4)]=function(){const _0x2983f7=_0x244290;return this['_scene']&&this['_scene'][_0x2983f7(0x1e8)]===Scene_Battle;},BattleManager[_0x244290(0x1ef)]=function(_0x37355d){const _0x4bdbc4=_0x244290;let _0x307e2f=this[_0x4bdbc4(0x287)];this['_counterAttackingTarget']&&(_0x307e2f=this[_0x4bdbc4(0x1fb)]);if(!_0x307e2f)return null;if(_0x307e2f[_0x4bdbc4(0x2b6)]()&&_0x37355d[_0x4bdbc4(0x34f)]())return _0x4bdbc4(0x260)===_0x4bdbc4(0x260)?'Battle\x20Actor\x20%1'['format'](_0x307e2f['actorId']()):this[_0x4bdbc4(0x2b0)]()[_0x4bdbc4(0x26d)](_0x41176a=>_0x41176a&&_0x41176a['note'][_0x4bdbc4(0x212)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));else{if(_0x307e2f[_0x4bdbc4(0x34f)]()&&_0x37355d[_0x4bdbc4(0x2b6)]())return _0x4bdbc4(0x229)[_0x4bdbc4(0x236)](_0x307e2f[_0x4bdbc4(0x1e0)]());}return null;},BattleManager[_0x244290(0x313)]=function(_0x2381c1){const _0x2c82bd=_0x244290;if(!_0x2381c1)return null;if(_0x2381c1[_0x2c82bd(0x212)](/BATTLE ACTOR (\d+)/i))return $gameActors[_0x2c82bd(0x340)](Number(RegExp['$1']));else{if(_0x2381c1[_0x2c82bd(0x212)](/BATTLE ENEMY (\d+)/i))return $gameTroop[_0x2c82bd(0x2bf)]()[Number(RegExp['$1'])];}return null;},BattleManager[_0x244290(0x211)]=function(){const _0x3bb2a4=_0x244290;return VisuMZ[_0x3bb2a4(0x2b7)][_0x3bb2a4(0x24d)][_0x3bb2a4(0x25d)][_0x3bb2a4(0x227)];},VisuMZ[_0x244290(0x2b7)][_0x244290(0x290)]=Game_Action[_0x244290(0x330)]['getSpecificBattlerKeyTarget'],Game_Action[_0x244290(0x330)][_0x244290(0x242)]=function(){const _0xdbf565=_0x244290;let _0x58fb4f=VisuMZ[_0xdbf565(0x2b7)][_0xdbf565(0x290)][_0xdbf565(0x369)](this);if(_0x58fb4f&&_0x58fb4f[_0xdbf565(0x2b6)]()!==this[_0xdbf565(0x238)]()[_0xdbf565(0x2b6)]()){if(_0xdbf565(0x251)===_0xdbf565(0x2c2)){this[_0xdbf565(0x246)]=[];let _0xbd32e=0x0;for(let _0x54d9fb=0x0;_0x54d9fb<=this[_0xdbf565(0x234)]();_0x54d9fb++){const _0x7ed957=new _0x101aef();_0x7ed957[_0xdbf565(0x2be)]=_0x496dce[_0xdbf565(0x36b)](),_0x7ed957[_0xdbf565(0x33a)]['x']=0.5,_0x7ed957[_0xdbf565(0x33a)]['y']=0.5,_0x7ed957[_0xdbf565(0x2f5)]['x']=_0x7ed957[_0xdbf565(0x2f5)]['y']=this[_0xdbf565(0x372)](),_0x7ed957[_0xdbf565(0x204)]=_0xbd32e,_0x7ed957[_0xdbf565(0x243)]=this[_0xdbf565(0x243)],this[_0xdbf565(0x371)](_0x7ed957),this[_0xdbf565(0x246)][_0xdbf565(0x1da)](_0x7ed957),_0xbd32e+=this[_0xdbf565(0x291)];if(_0xbd32e>=0xff)_0xbd32e=0x0;}}else{this['_targetIndex']=-0x1;if(this[_0xdbf565(0x205)]()){if('MKTCy'===_0xdbf565(0x30d))return this[_0xdbf565(0x238)]()['provoker']();else{if(!_0x5abbe5[_0xdbf565(0x2fb)])return;if(!_0x4004ed[_0xdbf565(0x2ff)])return;if(!_0x10b06b['AggroControlSystem']['Settings']['Taunt'][_0xdbf565(0x347)])return;if(!this['_battler'])return;this[_0xdbf565(0x221)]--,this[_0xdbf565(0x221)]<=0x0&&this[_0xdbf565(0x1fc)]();}}else{if(this[_0xdbf565(0x200)]()){if(_0xdbf565(0x1d2)!=='gJLxl'){const _0x29ff81=this[_0xdbf565(0x26b)]()[_0xdbf565(0x1e7)],_0x2a8f4c=this[_0xdbf565(0x2cd)]()['getTauntMembers'](_0x29ff81);if(!_0x2a8f4c[_0xdbf565(0x237)](_0x58fb4f))return _0x2a8f4c[Math[_0xdbf565(0x22b)](_0x2a8f4c['length'])];}else return _0x51090f(_0xec458e['$1'])*0.01;}else{if(this[_0xdbf565(0x2fe)]()){if('gODRh'===_0xdbf565(0x1de))return this[_0xdbf565(0x2cd)]()[_0xdbf565(0x2f6)]();else{_0x48f2c0[_0xdbf565(0x2b7)][_0xdbf565(0x338)][_0xdbf565(0x369)](this,_0x4593b3);if(this['_aggroGaugeSprite'])this[_0xdbf565(0x29f)][_0xdbf565(0x374)]=_0x7f3b6c;}}}}}}return _0x58fb4f;},VisuMZ[_0x244290(0x2b7)]['Game_Action_targetsForAlive']=Game_Action[_0x244290(0x330)][_0x244290(0x233)],Game_Action['prototype'][_0x244290(0x233)]=function(_0x441a99){const _0x4be061=_0x244290;if(this['isProvokeAffected']())return this[_0x4be061(0x331)]();else{if(this[_0x4be061(0x200)]())return this[_0x4be061(0x2c8)](_0x441a99);else{if(this[_0x4be061(0x2fe)]())return'xqMSm'!==_0x4be061(0x224)?0x64:[_0x441a99[_0x4be061(0x2f6)]()];else{if('wpFrQ'==='KeDeD')this[_0x4be061(0x325)]=_0x228a56[_0x4be061(0x24b)]();else return VisuMZ[_0x4be061(0x2b7)]['Game_Action_targetsForAlive'][_0x4be061(0x369)](this,_0x441a99);}}}},Game_Action[_0x244290(0x330)][_0x244290(0x205)]=function(){const _0x3c2fe2=_0x244290;if(!$gameParty[_0x3c2fe2(0x356)]())return![];if(!this[_0x3c2fe2(0x26b)]())return![];if(!this[_0x3c2fe2(0x26e)]())return![];if(DataManager['isBypassProvoke'](this[_0x3c2fe2(0x26b)]()))return![];if(this['subject']()['bypassProvoke']())return![];if(!this[_0x3c2fe2(0x238)]()[_0x3c2fe2(0x205)]())return![];const _0x3bec03=this[_0x3c2fe2(0x238)]()[_0x3c2fe2(0x36e)]();if(_0x3bec03['isDead']())return![];return!![];},Game_Action['prototype'][_0x244290(0x331)]=function(){const _0x17fd42=_0x244290;return[this[_0x17fd42(0x238)]()[_0x17fd42(0x36e)]()];},Game_Action[_0x244290(0x330)][_0x244290(0x200)]=function(){const _0x6228f8=_0x244290;if(!$gameParty[_0x6228f8(0x356)]())return![];if(!this[_0x6228f8(0x26b)]())return![];if(!this[_0x6228f8(0x26e)]())return![];if(DataManager['isBypassTaunt'](this[_0x6228f8(0x26b)]()))return![];if(this[_0x6228f8(0x238)]()[_0x6228f8(0x23c)]())return![];const _0xfb8c6a=this[_0x6228f8(0x2cd)]();let _0x22d573=![];if(this[_0x6228f8(0x316)]()&&_0xfb8c6a[_0x6228f8(0x24b)]()[_0x6228f8(0x365)]>0x0)_0x22d573=!![];if(this['isMagical']()&&_0xfb8c6a[_0x6228f8(0x225)]()['length']>0x0)_0x22d573=!![];if(this[_0x6228f8(0x2a9)]()&&_0xfb8c6a[_0x6228f8(0x34d)]()[_0x6228f8(0x365)]>0x0)_0x22d573=!![];return _0x22d573;},Game_Action[_0x244290(0x330)][_0x244290(0x2c8)]=function(_0x3710b9){const _0x322830=_0x244290;if(this[_0x322830(0x34b)]<0x0)return _0x322830(0x263)===_0x322830(0x341)?_0x153eef['AggroControlSystem'][_0x322830(0x273)][_0x322830(0x369)](this):[_0x3710b9['randomTauntTarget'](this[_0x322830(0x26b)]()[_0x322830(0x1e7)])];else{const _0x2e558a=_0x3710b9[_0x322830(0x252)](this[_0x322830(0x34b)]);return _0x2e558a[_0x322830(0x1d5)](this[_0x322830(0x26b)]()['hitType'])?_0x322830(0x222)===_0x322830(0x222)?[_0x2e558a]:this['physicalTaunt']()||this[_0x322830(0x2dc)]()||this[_0x322830(0x28c)]():[_0x3710b9['randomTauntTarget']()];}},Game_Action[_0x244290(0x330)]['isAggroAffected']=function(){const _0x5415ca=_0x244290;if(!$gameParty[_0x5415ca(0x356)]())return![];if(this[_0x5415ca(0x26b)]()[_0x5415ca(0x36a)]!==0x1)return![];if(this[_0x5415ca(0x34b)]>=0x0)return![];if(DataManager[_0x5415ca(0x223)](this[_0x5415ca(0x26b)]()))return![];if(this[_0x5415ca(0x238)]()[_0x5415ca(0x32a)]())return![];if(DataManager[_0x5415ca(0x351)](this[_0x5415ca(0x26b)]()))return!![];if(this[_0x5415ca(0x238)]()[_0x5415ca(0x351)]())return!![];return BattleManager[_0x5415ca(0x211)]();},VisuMZ[_0x244290(0x2b7)][_0x244290(0x2ae)]=Game_Action[_0x244290(0x330)][_0x244290(0x230)],Game_Action[_0x244290(0x330)][_0x244290(0x230)]=function(){const _0x4511f6=_0x244290;VisuMZ[_0x4511f6(0x2b7)]['Game_Action_applyGlobal'][_0x4511f6(0x369)](this),this[_0x4511f6(0x20f)]();},Game_Action[_0x244290(0x330)][_0x244290(0x20f)]=function(){const _0x3f2dd4=_0x244290,_0x5bbd1f=this['item']()[_0x3f2dd4(0x1ff)];if(_0x5bbd1f[_0x3f2dd4(0x212)](/<(?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT): ([\+\-]\d+)>/i)){const _0x41362d=Number(RegExp['$1']);this['subject']()[_0x3f2dd4(0x34a)](_0x41362d);}if(_0x5bbd1f[_0x3f2dd4(0x212)](/<JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>\s*([\s\S]*)\s*<\/JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>/i)){if(_0x3f2dd4(0x268)===_0x3f2dd4(0x268)){const _0x1bae9c=String(RegExp['$1']);window['user']=this[_0x3f2dd4(0x238)](),window[_0x3f2dd4(0x26b)]=this['item'](),window['a']=this[_0x3f2dd4(0x238)](),window['b']=a,window[_0x3f2dd4(0x202)]=user['battleAggro']();try{eval(_0x1bae9c);}catch(_0x17f727){if('dhgtD'!==_0x3f2dd4(0x295)){let _0x48d132=this[_0x3f2dd4(0x296)][_0x3f2dd4(0x365)];while(_0x48d132){const _0x5e7c3b=this[_0x3f2dd4(0x296)][_0x3f2dd4(0x2f8)]();this[_0x3f2dd4(0x296)][_0x3f2dd4(0x1da)](_0x5e7c3b);const _0x2c7dc7=_0x3f2dd4(0x329)[_0x3f2dd4(0x236)](_0x5e7c3b);if(this[_0x3f2dd4(0x374)][_0x2c7dc7]()){const _0x4e207e='_%1TauntAnimation'['format'](_0x5e7c3b),_0x51754f=_0x25bc05[_0x4e207e];if(_0x51754f)return _0x51754f;}_0x48d132--;}return _0x10363f[_0x3f2dd4(0x27f)];}else{if($gameTemp[_0x3f2dd4(0x2fc)]())console['log'](_0x17f727);}}user[_0x3f2dd4(0x264)](window[_0x3f2dd4(0x202)]),window[_0x3f2dd4(0x2af)]=undefined,window['target']=undefined,window[_0x3f2dd4(0x26b)]=undefined,window['a']=undefined,window['b']=undefined,window['value']=undefined;}else return[_0xceb296[_0x3f2dd4(0x333)](this[_0x3f2dd4(0x26b)]()[_0x3f2dd4(0x1e7)])];}},VisuMZ[_0x244290(0x2b7)][_0x244290(0x2a1)]=Game_Action['prototype'][_0x244290(0x21a)],Game_Action[_0x244290(0x330)][_0x244290(0x21a)]=function(_0x237888){const _0x5b88aa=_0x244290;VisuMZ[_0x5b88aa(0x2b7)][_0x5b88aa(0x2a1)]['call'](this,_0x237888),this[_0x5b88aa(0x257)](_0x237888);},Game_Action['prototype'][_0x244290(0x257)]=function(_0x449d5b){const _0x1d8c13=_0x244290;if(!this['item']())return;if(!SceneManager[_0x1d8c13(0x2e4)]())return;const _0x5ecd2c=this['item']()[_0x1d8c13(0x1ff)];if(_0x5ecd2c[_0x1d8c13(0x212)](/<TARGET (?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){if(_0x1d8c13(0x2bd)===_0x1d8c13(0x2bd)){const _0x19914c=Number(RegExp['$1']);_0x449d5b[_0x1d8c13(0x34a)](_0x19914c);}else{if(!this[_0x1d8c13(0x30f)][_0x1d8c13(0x374)])return;if(!this[_0x1d8c13(0x30f)][_0x1d8c13(0x374)]['provoker']())return;const _0x236c19=this['_mainSprite']['_battler'][_0x1d8c13(0x36e)]()[_0x1d8c13(0x27c)]();if(!_0x236c19)return;const _0xb1ec16=this['_mainSprite'][_0x1d8c13(0x374)]['provokeHeightOrigin'](),_0x8f41df=this['_mainSprite'][_0x1d8c13(0x374)][_0x1d8c13(0x36e)]()[_0x1d8c13(0x30c)]();this[_0x1d8c13(0x1ea)]=this[_0x1d8c13(0x30f)]['x'],this[_0x1d8c13(0x1f7)]=this[_0x1d8c13(0x30f)]['y']-this[_0x1d8c13(0x30f)][_0x1d8c13(0x2b4)]*_0xb1ec16,this[_0x1d8c13(0x232)]=_0x236c19['x'],this[_0x1d8c13(0x27a)]=_0x236c19['y']-_0x236c19['height']*_0x8f41df,this[_0x1d8c13(0x1ea)]+=_0x55ef8b[_0x1d8c13(0x2b5)]((_0x3bd5f2[_0x1d8c13(0x1d6)]-_0x42f570['boxWidth'])/0x2),this[_0x1d8c13(0x1f7)]+=_0x322434[_0x1d8c13(0x2b5)]((_0x31056a['height']-_0x253b88[_0x1d8c13(0x319)])/0x2),this['_targetX']+=_0x12d9b6['round']((_0x139699['width']-_0x1409ee[_0x1d8c13(0x23f)])/0x2),this[_0x1d8c13(0x27a)]+=_0x10678e[_0x1d8c13(0x2b5)]((_0x32220f[_0x1d8c13(0x2b4)]-_0x12b416[_0x1d8c13(0x319)])/0x2);if(!_0x3bd569[_0x1d8c13(0x1f9)]()){if(_0x236c19[_0x1d8c13(0x374)][_0x1d8c13(0x2b6)]())_0x3d70e4=!![],this[_0x1d8c13(0x232)]+=_0x14a1ed[_0x1d8c13(0x1e1)][_0x1d8c13(0x30a)]['x'],this[_0x1d8c13(0x27a)]+=_0x4e4057[_0x1d8c13(0x1e1)][_0x1d8c13(0x30a)]['y'];else _0x236c19[_0x1d8c13(0x374)][_0x1d8c13(0x34f)]()&&(_0x47335b=!![],this[_0x1d8c13(0x1ea)]+=_0x302805[_0x1d8c13(0x1e1)][_0x1d8c13(0x30a)]['x'],this[_0x1d8c13(0x1f7)]+=_0xb34e2['_scene'][_0x1d8c13(0x30a)]['y']);}}}if(_0x5ecd2c[_0x1d8c13(0x212)](/<JS TARGET (?:AGGRO|ENMITY|THREAT)>\s*([\s\S]*)\s*<\/JS TARGET (?:AGGRO|ENMITY|THREAT)>/i)){const _0x5c1be1=String(RegExp['$1']);window[_0x1d8c13(0x2af)]=this[_0x1d8c13(0x238)](),window[_0x1d8c13(0x1ee)]=_0x449d5b,window['item']=this[_0x1d8c13(0x26b)](),window['a']=this[_0x1d8c13(0x238)](),window['b']=_0x449d5b,window[_0x1d8c13(0x202)]=_0x449d5b['battleAggro']();try{eval(_0x5c1be1);}catch(_0x499a68){if($gameTemp['isPlaytest']())console[_0x1d8c13(0x324)](_0x499a68);}_0x449d5b['setAggro'](window[_0x1d8c13(0x202)]),window[_0x1d8c13(0x2af)]=undefined,window[_0x1d8c13(0x1ee)]=undefined,window[_0x1d8c13(0x26b)]=undefined,window['a']=undefined,window['b']=undefined,window[_0x1d8c13(0x202)]=undefined;}},VisuMZ['AggroControlSystem'][_0x244290(0x33b)]=Game_Action[_0x244290(0x330)][_0x244290(0x2cf)],Game_Action[_0x244290(0x330)]['executeHpDamage']=function(_0x264560,_0x55dcac){const _0x26eeb0=_0x244290;VisuMZ[_0x26eeb0(0x2b7)][_0x26eeb0(0x33b)]['call'](this,_0x264560,_0x55dcac),this['executeHpDamageAggroControl'](_0x264560,_0x55dcac);},Game_Action[_0x244290(0x330)][_0x244290(0x2e5)]=function(_0x44e17a,_0x4b54f0){const _0x80974f=_0x244290,_0x1fcac2=VisuMZ[_0x80974f(0x2b7)]['Settings']['Aggro'];if(_0x4b54f0>0x0&&_0x44e17a['isActor']()!==this[_0x80974f(0x238)]()[_0x80974f(0x2b6)]()){const _0x598d78=_0x1fcac2['AggroPerDmg'];this[_0x80974f(0x238)]()[_0x80974f(0x34a)](_0x598d78*_0x4b54f0);}if(_0x4b54f0<0x0&&_0x44e17a['isActor']()===this['subject']()['isActor']()){const _0x357ac2=_0x1fcac2['AggroPerHeal'];this['subject']()[_0x80974f(0x34a)](_0x357ac2*Math['abs'](_0x4b54f0));}},VisuMZ[_0x244290(0x2b7)][_0x244290(0x31b)]=Game_BattlerBase[_0x244290(0x330)]['initMembers'],Game_BattlerBase[_0x244290(0x330)]['initMembers']=function(){const _0x4eb2d7=_0x244290;this[_0x4eb2d7(0x2df)]={},VisuMZ[_0x4eb2d7(0x2b7)][_0x4eb2d7(0x31b)][_0x4eb2d7(0x369)](this),this[_0x4eb2d7(0x2f4)]();},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x2f4)]=function(){const _0x9f390=_0x244290;this[_0x9f390(0x22e)](),this[_0x9f390(0x258)]();},Game_BattlerBase[_0x244290(0x330)]['clearProvokers']=function(){const _0x8d25e7=_0x244290;this[_0x8d25e7(0x1d4)]={};},VisuMZ[_0x244290(0x2b7)][_0x244290(0x37a)]=Game_BattlerBase[_0x244290(0x330)][_0x244290(0x1e6)],Game_BattlerBase['prototype'][_0x244290(0x1e6)]=function(){const _0x37d5a9=_0x244290;this[_0x37d5a9(0x2df)]={},VisuMZ['AggroControlSystem'][_0x37d5a9(0x37a)][_0x37d5a9(0x369)](this),this[_0x37d5a9(0x306)]();},Game_BattlerBase[_0x244290(0x330)]['checkCacheKey']=function(_0x357e26){const _0xf663ca=_0x244290;return this[_0xf663ca(0x2df)]=this[_0xf663ca(0x2df)]||{},this[_0xf663ca(0x2df)][_0x357e26]!==undefined;},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x36e)]=function(){const _0xed1c6e=_0x244290;for(const _0x2c6b7b of this[_0xed1c6e(0x2c0)]()){if('VXUwo'===_0xed1c6e(0x357))return _0x20dd5e[_0xed1c6e(0x307)]((_0x44eed8,_0x42e6fd)=>_0x44eed8+_0x42e6fd['tgr'],0x0);else{if(DataManager[_0xed1c6e(0x320)](_0x2c6b7b)){if('AETje'===_0xed1c6e(0x2ac)){this[_0xed1c6e(0x325)]=[_0x159e77[_0xed1c6e(0x36e)]()];if(_0x31ef87[_0xed1c6e(0x1f4)]&&_0x170c81[_0xed1c6e(0x1f4)]()){const _0x5b52af=_0x15a36d[_0xed1c6e(0x2e0)]();this[_0xed1c6e(0x325)]=this[_0xed1c6e(0x325)][_0xed1c6e(0x2fd)](_0x5b52af),_0x354169[_0xed1c6e(0x20b)]&&_0xf5b197['canSingleOrMultipleSelect']()&&_0x5b52af['length']>0x1&&this[_0xed1c6e(0x2f9)]('pagedown',this[_0xed1c6e(0x2b9)][_0xed1c6e(0x345)](this));}return!![];}else{if(this[_0xed1c6e(0x1d4)]===undefined)this['clearProvokers']();const _0x563c5f=this[_0xed1c6e(0x1d4)][_0x2c6b7b['id']],_0x56ffd1=BattleManager[_0xed1c6e(0x313)](_0x563c5f);if(_0x56ffd1&&_0x56ffd1[_0xed1c6e(0x33f)]())return _0x56ffd1;}}}}return null;},Game_BattlerBase['prototype']['isProvokeAffected']=function(){return!!this['provoker']();},Game_BattlerBase['prototype'][_0x244290(0x300)]=function(){const _0x5db937=_0x244290;return this['traitObjects']()[_0x5db937(0x26d)](_0x4f98ac=>_0x4f98ac&&_0x4f98ac[_0x5db937(0x1ff)]['match'](/<BYPASS PROVOKE>/i));},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x30c)]=function(){const _0x2ebfd5=_0x244290;let _0x31a820='provokeHeightOrigin';if(this['checkCacheKey'](_0x31a820))return this['_cache'][_0x31a820];return this['_cache'][_0x31a820]=this[_0x2ebfd5(0x28d)](),this['_cache'][_0x31a820];},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x28d)]=function(){const _0x9d8ca6=_0x244290,_0x3bc4b3=this[_0x9d8ca6(0x2b6)]()?this['actor']()[_0x9d8ca6(0x1ff)]:this[_0x9d8ca6(0x34f)]()?this[_0x9d8ca6(0x254)]()[_0x9d8ca6(0x1ff)]:'';if(_0x3bc4b3['match'](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return Number(RegExp['$1'])*0.01;return VisuMZ['AggroControlSystem'][_0x9d8ca6(0x24d)]['Provoke'][_0x9d8ca6(0x2d5)];},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x306)]=function(){const _0x30886e=_0x244290;for(const _0x5cc96a of this[_0x30886e(0x2c0)]()){if(DataManager[_0x30886e(0x320)](_0x5cc96a)){if(this[_0x30886e(0x1d4)]===undefined)this['clearProvokers']();const _0x3cd6e9=this[_0x30886e(0x1d4)][_0x5cc96a['id']],_0x44f6f6=BattleManager[_0x30886e(0x313)](_0x3cd6e9);_0x44f6f6&&_0x44f6f6[_0x30886e(0x23e)]()&&this[_0x30886e(0x275)](_0x5cc96a['id']);}}},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x1d5)]=function(_0x582bab){const _0x2a1752=_0x244290;switch(_0x582bab){case Game_Action[_0x2a1752(0x2ec)]:return this[_0x2a1752(0x355)]();break;case Game_Action[_0x2a1752(0x283)]:return this[_0x2a1752(0x2dc)]();break;case Game_Action[_0x2a1752(0x220)]:return this[_0x2a1752(0x28c)]();break;}},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x322)]=function(){const _0x3951ee=_0x244290;return this[_0x3951ee(0x355)]()||this[_0x3951ee(0x2dc)]()||this[_0x3951ee(0x28c)]();},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x355)]=function(){const _0x53d1a9=_0x244290;return this[_0x53d1a9(0x2b0)]()[_0x53d1a9(0x26d)](_0xa35af1=>_0xa35af1&&_0xa35af1['note'][_0x53d1a9(0x212)](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase['prototype'][_0x244290(0x2dc)]=function(){const _0x24fec4=_0x244290;return this[_0x24fec4(0x2b0)]()[_0x24fec4(0x26d)](_0x555311=>_0x555311&&_0x555311[_0x24fec4(0x1ff)]['match'](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x244290(0x330)]['certainHitTaunt']=function(){const _0x39de01=_0x244290;return this[_0x39de01(0x2b0)]()[_0x39de01(0x26d)](_0x854ec4=>_0x854ec4&&_0x854ec4[_0x39de01(0x1ff)][_0x39de01(0x212)](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x23c)]=function(){const _0x185e1e=_0x244290;return this[_0x185e1e(0x2b0)]()[_0x185e1e(0x26d)](_0x3ad976=>_0x3ad976&&_0x3ad976['note'][_0x185e1e(0x212)](/<BYPASS TAUNT>/i));},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x258)]=function(){this['_aggro']=0x1;},VisuMZ[_0x244290(0x2b7)][_0x244290(0x27b)]=Game_BattlerBase[_0x244290(0x330)][_0x244290(0x21c)],Game_BattlerBase[_0x244290(0x330)][_0x244290(0x21c)]=function(_0x36acdc){const _0x38160d=_0x244290;let _0x5df16f=VisuMZ[_0x38160d(0x2b7)][_0x38160d(0x27b)][_0x38160d(0x369)](this,_0x36acdc);if(_0x36acdc===0x0){if(_0x38160d(0x29b)!=='BNcGU')this[_0x38160d(0x204)]=0x0;else{if(this[_0x38160d(0x309)]===undefined)this[_0x38160d(0x258)]();_0x5df16f*=this['aggro']();}}return _0x5df16f;},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x264)]=function(_0xbb71e7){const _0x54eb09=_0x244290;if(this[_0x54eb09(0x309)]===undefined)this[_0x54eb09(0x258)]();this[_0x54eb09(0x309)]=Math[_0x54eb09(0x332)](0x1,Math[_0x54eb09(0x2b5)](this[_0x54eb09(0x309)]));},Game_BattlerBase['prototype'][_0x244290(0x34a)]=function(_0xf90889){const _0x2c2fcd=_0x244290;if(this['_aggro']===undefined)this['clearAggro']();this[_0x2c2fcd(0x309)]=Math[_0x2c2fcd(0x332)](0x1,this['_aggro']+Math[_0x2c2fcd(0x2b5)](_0xf90889));},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x2f3)]=function(_0x58c58e){this['gainAggro'](-_0x58c58e);},Game_BattlerBase['prototype'][_0x244290(0x281)]=function(){const _0x6de65c=_0x244290;if(this[_0x6de65c(0x23e)]())return 0x0;return this[_0x6de65c(0x1f8)]()*this[_0x6de65c(0x311)]();},Game_BattlerBase['prototype'][_0x244290(0x201)]=function(){const _0x5ea9e6=_0x244290;if(this[_0x5ea9e6(0x309)]===undefined){if('SJqOI'===_0x5ea9e6(0x1f5))this[_0x5ea9e6(0x258)]();else{if(!_0x5615ca)return![];return _0x9b5082[_0x5ea9e6(0x1ff)][_0x5ea9e6(0x212)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);}}return this[_0x5ea9e6(0x309)];},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x1f8)]=function(){const _0x539c3a=_0x244290;return this['traitObjects']()['reduce']((_0x2031a6,_0x30b372)=>{const _0x4d5c86=_0x51a2;return _0x30b372&&_0x30b372[_0x4d5c86(0x1ff)][_0x4d5c86(0x212)](/<(?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)?_0x2031a6+Number(RegExp['$1'])/0x64:_0x2031a6;},this[_0x539c3a(0x201)]());},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x311)]=function(){const _0x3adceb=_0x244290;return this['traitObjects']()[_0x3adceb(0x307)]((_0x51f3a7,_0x49cbe7)=>{const _0x112e13=_0x3adceb;return _0x49cbe7&&_0x49cbe7[_0x112e13(0x1ff)][_0x112e13(0x212)](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i)?_0x51f3a7+Number(RegExp['$1'])/0x64:_0x51f3a7;},0x1);},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x32a)]=function(){const _0x4ca703=_0x244290;return this[_0x4ca703(0x2b0)]()['some'](_0xad5b4b=>_0xad5b4b&&_0xad5b4b[_0x4ca703(0x1ff)][_0x4ca703(0x212)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},Game_BattlerBase[_0x244290(0x330)][_0x244290(0x351)]=function(){const _0x2e5ccb=_0x244290;return this[_0x2e5ccb(0x2b0)]()['some'](_0x4135aa=>_0x4135aa&&_0x4135aa['note'][_0x2e5ccb(0x212)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},VisuMZ[_0x244290(0x2b7)][_0x244290(0x315)]=Game_Battler['prototype'][_0x244290(0x2e6)],Game_Battler[_0x244290(0x330)]['onBattleStart']=function(_0x29b743){const _0x3cf9c4=_0x244290;VisuMZ[_0x3cf9c4(0x2b7)]['Game_Battler_onBattleStart']['call'](this,_0x29b743),this[_0x3cf9c4(0x258)]();},VisuMZ['AggroControlSystem']['Game_Battler_onBattleEnd']=Game_Battler[_0x244290(0x330)]['onBattleEnd'],Game_Battler[_0x244290(0x330)][_0x244290(0x344)]=function(){const _0x3a0aed=_0x244290;VisuMZ[_0x3a0aed(0x2b7)][_0x3a0aed(0x1db)][_0x3a0aed(0x369)](this),this[_0x3a0aed(0x258)]();},VisuMZ[_0x244290(0x2b7)]['Game_Battler_addState']=Game_Battler['prototype'][_0x244290(0x36f)],Game_Battler[_0x244290(0x330)][_0x244290(0x36f)]=function(_0x3db130){const _0x251be0=_0x244290;VisuMZ[_0x251be0(0x2b7)][_0x251be0(0x379)]['call'](this,_0x3db130),this[_0x251be0(0x21b)](_0x3db130);},Game_Battler[_0x244290(0x330)][_0x244290(0x21b)]=function(_0x2a8c0a){const _0x260aac=_0x244290;if(this['isStateAffected'](_0x2a8c0a)){if(_0x260aac(0x302)!==_0x260aac(0x302))_0x350284=_0x390814['x']+_0xcb4556[_0x260aac(0x378)]+0x8;else{if(this['_provoker']===undefined)this[_0x260aac(0x22e)]();const _0x25b3c5=BattleManager[_0x260aac(0x1ef)](this);this[_0x260aac(0x1d4)][_0x2a8c0a]=_0x25b3c5,!this['_provoker'][_0x2a8c0a]&&delete this[_0x260aac(0x1d4)][_0x2a8c0a];}}},VisuMZ[_0x244290(0x2b7)][_0x244290(0x2c5)]=BattleManager['invokeCounterAttack'],BattleManager[_0x244290(0x2b2)]=function(_0x3a76b5,_0x96cd49){const _0x44eb61=_0x244290;this['_counterAttackingTarget']=_0x96cd49,VisuMZ[_0x44eb61(0x2b7)][_0x44eb61(0x2c5)]['call'](this,_0x3a76b5,_0x96cd49),this[_0x44eb61(0x1fb)]=undefined;},VisuMZ['AggroControlSystem'][_0x244290(0x305)]=BattleManager['invokeMagicReflection'],BattleManager[_0x244290(0x2a6)]=function(_0x596e77,_0x1e9cd7){const _0x3ee32f=_0x244290;this[_0x3ee32f(0x1fb)]=_0x1e9cd7,VisuMZ[_0x3ee32f(0x2b7)][_0x3ee32f(0x305)][_0x3ee32f(0x369)](this,_0x596e77,_0x1e9cd7),this[_0x3ee32f(0x1fb)]=undefined;},Game_Unit[_0x244290(0x330)][_0x244290(0x24b)]=function(){const _0x3b39a3=_0x244290;return this['aliveMembers']()[_0x3b39a3(0x2b1)](_0x4c499d=>_0x4c499d&&_0x4c499d[_0x3b39a3(0x355)]());},Game_Unit[_0x244290(0x330)][_0x244290(0x225)]=function(){const _0x49a9d5=_0x244290;return this[_0x49a9d5(0x2e0)]()[_0x49a9d5(0x2b1)](_0x163070=>_0x163070&&_0x163070[_0x49a9d5(0x2dc)]());},Game_Unit[_0x244290(0x330)][_0x244290(0x34d)]=function(){const _0x5752c6=_0x244290;return this[_0x5752c6(0x2e0)]()[_0x5752c6(0x2b1)](_0x35bcc2=>_0x35bcc2&&_0x35bcc2[_0x5752c6(0x28c)]());},Game_Unit[_0x244290(0x330)]['getTauntMembers']=function(_0x1b4dd9){const _0x7f62df=_0x244290;switch(_0x1b4dd9){case Game_Action[_0x7f62df(0x2ec)]:return this[_0x7f62df(0x24b)]();break;case Game_Action[_0x7f62df(0x283)]:return this[_0x7f62df(0x225)]();break;case Game_Action['HITTYPE_CERTAIN']:return this['certainHitTauntMembers']();break;}return[];},Game_Unit[_0x244290(0x330)][_0x244290(0x333)]=function(_0x2720db){const _0x106cbc=_0x244290;let _0x572278=[];switch(_0x2720db){case Game_Action[_0x106cbc(0x2ec)]:_0x572278=this[_0x106cbc(0x24b)]();break;case Game_Action[_0x106cbc(0x283)]:_0x572278=this[_0x106cbc(0x225)]();break;case Game_Action[_0x106cbc(0x220)]:_0x572278=this['certainHitTauntMembers']();break;}let _0x363488=Math['random']()*this['tgrSumFromGroup'](_0x572278),_0x4b15d8=null;if(BattleManager[_0x106cbc(0x211)]()){if(_0x106cbc(0x247)!=='apSyT')return _0x404816['AggroControlSystem'][_0x106cbc(0x2c9)][_0x106cbc(0x369)](this);else{const _0x26685a=!![];return this[_0x106cbc(0x353)](_0x572278,_0x26685a);}}else{for(const _0x2d7b26 of _0x572278){_0x363488-=_0x2d7b26[_0x106cbc(0x22d)];if(_0x363488<=0x0&&!_0x4b15d8){if(_0x106cbc(0x34e)!=='diyoo')_0x4b15d8=_0x2d7b26;else{if(!this[_0x106cbc(0x1dd)])return;if(!this[_0x106cbc(0x207)])return;this[_0x106cbc(0x1dd)]['x']=this[_0x106cbc(0x207)]['x'],this['_provokeContainer']['y']=this[_0x106cbc(0x207)]['y'];}}}return _0x4b15d8||this[_0x106cbc(0x2a8)]();}},Game_Unit[_0x244290(0x330)]['tgrSumFromGroup']=function(_0x52f4b0){const _0x5280b9=_0x244290;return _0x52f4b0[_0x5280b9(0x307)]((_0x755698,_0x2119ed)=>_0x755698+_0x2119ed[_0x5280b9(0x22d)],0x0);},Game_Unit[_0x244290(0x330)][_0x244290(0x1ec)]=function(){const _0x4f3b74=_0x244290,_0x445fb4=this[_0x4f3b74(0x2e0)]()[_0x4f3b74(0x33c)](_0x35b6b7=>_0x35b6b7[_0x4f3b74(0x22d)]);return Math[_0x4f3b74(0x332)](..._0x445fb4);},Game_Unit[_0x244290(0x330)][_0x244290(0x249)]=function(){const _0x22ff02=_0x244290,_0x20c222=this[_0x22ff02(0x2e0)]()[_0x22ff02(0x33c)](_0x3d9d9c=>_0x3d9d9c[_0x22ff02(0x22d)]);return Math['min'](..._0x20c222);},Game_Unit[_0x244290(0x330)]['clearTgrCache']=function(){const _0x1e91c1=_0x244290;this[_0x1e91c1(0x28e)]=undefined,this[_0x1e91c1(0x28f)]=undefined;},Game_Unit['prototype'][_0x244290(0x2f6)]=function(){const _0xb58749=_0x244290;if(!this[_0xb58749(0x28e)]){if('eVExN'===_0xb58749(0x352))this[_0xb58749(0x2f9)](_0xb58749(0x208),this[_0xb58749(0x2b9)][_0xb58749(0x345)](this));else{const _0x13d0ca=this[_0xb58749(0x1ec)](),_0x29c001=this[_0xb58749(0x2e0)]()['filter'](_0x14fea3=>_0x14fea3['tgr']===_0x13d0ca);this[_0xb58749(0x28e)]=_0x29c001[Math[_0xb58749(0x22b)](_0x29c001[_0xb58749(0x365)])]||this[_0xb58749(0x2a8)]();}}return this[_0xb58749(0x28e)];},Game_Unit['prototype'][_0x244290(0x2d6)]=function(){const _0xf1d2d4=_0x244290;if(!this[_0xf1d2d4(0x28f)]){const _0x55c1f2=this[_0xf1d2d4(0x249)](),_0x4dff34=this['aliveMembers']()[_0xf1d2d4(0x2b1)](_0x3d0a8a=>_0x3d0a8a[_0xf1d2d4(0x22d)]===_0x55c1f2);this[_0xf1d2d4(0x28f)]=_0x4dff34[Math[_0xf1d2d4(0x22b)](_0x4dff34['length'])]||this[_0xf1d2d4(0x2a8)]();}return this[_0xf1d2d4(0x28f)];},VisuMZ[_0x244290(0x2b7)]['BattleManager_endAction']=BattleManager[_0x244290(0x367)],BattleManager[_0x244290(0x367)]=function(){const _0x43ca8d=_0x244290;VisuMZ[_0x43ca8d(0x2b7)][_0x43ca8d(0x35b)][_0x43ca8d(0x369)](this),$gameParty[_0x43ca8d(0x375)](),$gameTroop[_0x43ca8d(0x375)]();},Game_Unit[_0x244290(0x330)][_0x244290(0x353)]=function(_0x635d79,_0x1baa1c){const _0x35293e=_0x244290,_0x197239=_0x635d79[_0x35293e(0x33c)](_0x3d9e34=>_0x3d9e34[_0x35293e(0x22d)]),_0x54f449=_0x1baa1c?Math[_0x35293e(0x332)](..._0x197239):Math[_0x35293e(0x276)](..._0x197239),_0x69bf8b=_0x635d79[_0x35293e(0x2b1)](_0x242595=>_0x242595[_0x35293e(0x22d)]===_0x54f449);return _0x69bf8b[Math[_0x35293e(0x22b)](_0x69bf8b['length'])]||this[_0x35293e(0x2a8)]();},VisuMZ[_0x244290(0x2b7)][_0x244290(0x25b)]=Scene_Options[_0x244290(0x330)][_0x244290(0x30b)],Scene_Options['prototype']['maxCommands']=function(){const _0x36c457=_0x244290;let _0x470de1=VisuMZ[_0x36c457(0x2b7)]['Scene_Options_maxCommands']['call'](this);const _0x519331=VisuMZ[_0x36c457(0x2b7)][_0x36c457(0x24d)];if(_0x519331['Provoke'][_0x36c457(0x217)]&&_0x519331['Provoke'][_0x36c457(0x2ef)])_0x470de1++;if(_0x519331[_0x36c457(0x25d)][_0x36c457(0x217)]&&_0x519331[_0x36c457(0x25d)][_0x36c457(0x2ef)])_0x470de1++;return _0x470de1;},Sprite_Battler[_0x244290(0x20d)]=VisuMZ['AggroControlSystem']['Settings']['Taunt'][_0x244290(0x2d9)],Sprite_Battler[_0x244290(0x2f7)]=VisuMZ[_0x244290(0x2b7)][_0x244290(0x24d)][_0x244290(0x339)][_0x244290(0x226)],Sprite_Battler['_magicalTauntAnimation']=VisuMZ[_0x244290(0x2b7)][_0x244290(0x24d)][_0x244290(0x339)]['AniMagical'],Sprite_Battler['_certainHitTauntAnimation']=VisuMZ[_0x244290(0x2b7)]['Settings'][_0x244290(0x339)][_0x244290(0x362)],Sprite_Battler[_0x244290(0x35d)]=VisuMZ[_0x244290(0x2b7)][_0x244290(0x24d)][_0x244290(0x339)]['MirrorActorAni'],Sprite_Battler[_0x244290(0x1e2)]=VisuMZ['AggroControlSystem'][_0x244290(0x24d)][_0x244290(0x339)][_0x244290(0x20c)],VisuMZ[_0x244290(0x2b7)][_0x244290(0x21d)]=Sprite_Battler[_0x244290(0x330)]['initialize'],Sprite_Battler['prototype'][_0x244290(0x31a)]=function(_0x32f2c6){const _0x4c3c79=_0x244290;VisuMZ[_0x4c3c79(0x2b7)][_0x4c3c79(0x21d)][_0x4c3c79(0x369)](this,_0x32f2c6),this[_0x4c3c79(0x368)]()&&(_0x4c3c79(0x22c)===_0x4c3c79(0x2cb)?(_0x51cc58['AggroControlSystem'][_0x4c3c79(0x2e9)][_0x4c3c79(0x369)](this),this['updateTauntAnimations']()):setTimeout(this[_0x4c3c79(0x210)]['bind'](this),0x3e8));},VisuMZ[_0x244290(0x2b7)]['Sprite_Battler_initMembers']=Sprite_Battler[_0x244290(0x330)]['initMembers'],Sprite_Battler[_0x244290(0x330)][_0x244290(0x214)]=function(){const _0x17e132=_0x244290;VisuMZ[_0x17e132(0x2b7)][_0x17e132(0x29c)][_0x17e132(0x369)](this),this[_0x17e132(0x289)]();},Sprite_Battler['prototype'][_0x244290(0x289)]=function(){const _0x43f465=_0x244290;this['_tauntAnimationTimer']=VisuMZ[_0x43f465(0x2b7)][_0x43f465(0x24d)][_0x43f465(0x339)][_0x43f465(0x2d9)],this['_tauntAnimationCycle']=['physical',_0x43f465(0x328),_0x43f465(0x29e)];},Sprite_Battler[_0x244290(0x330)][_0x244290(0x368)]=function(){const _0x486349=_0x244290;if(!Imported['VisuMZ_1_BattleCore'])return![];if(![Sprite_Actor,Sprite_Enemy][_0x486349(0x237)](this[_0x486349(0x1e8)]))return![];return ConfigManager['provokeOrigin']&&VisuMZ['AggroControlSystem'][_0x486349(0x24d)][_0x486349(0x32d)][_0x486349(0x1d1)];},Sprite_Battler[_0x244290(0x330)][_0x244290(0x210)]=function(){const _0x2dc787=_0x244290;if(!SceneManager[_0x2dc787(0x2e4)]())return;this['_provokeSprite']=new Sprite_ProvokeTrail(this),this['_provokeSprite'][_0x2dc787(0x267)]()[_0x2dc787(0x371)](this['_provokeSprite']);},VisuMZ[_0x244290(0x2b7)][_0x244290(0x338)]=Sprite_Battler['prototype'][_0x244290(0x363)],Sprite_Battler[_0x244290(0x330)][_0x244290(0x363)]=function(_0x412b57){const _0x2fb56e=_0x244290;VisuMZ[_0x2fb56e(0x2b7)][_0x2fb56e(0x338)][_0x2fb56e(0x369)](this,_0x412b57);if(this[_0x2fb56e(0x29f)])this[_0x2fb56e(0x29f)][_0x2fb56e(0x374)]=_0x412b57;},VisuMZ[_0x244290(0x2b7)][_0x244290(0x2e9)]=Sprite_Battler[_0x244290(0x330)][_0x244290(0x1f2)],Sprite_Battler[_0x244290(0x330)][_0x244290(0x1f2)]=function(){const _0x46d2b3=_0x244290;VisuMZ[_0x46d2b3(0x2b7)][_0x46d2b3(0x2e9)][_0x46d2b3(0x369)](this),this[_0x46d2b3(0x35f)]();},Sprite_Battler['prototype']['updateTauntAnimations']=function(){const _0x106523=_0x244290;if(!Imported[_0x106523(0x2fb)])return;if(!Imported[_0x106523(0x2ff)])return;if(!VisuMZ['AggroControlSystem'][_0x106523(0x24d)][_0x106523(0x339)][_0x106523(0x347)])return;if(!this[_0x106523(0x374)])return;this[_0x106523(0x221)]--,this[_0x106523(0x221)]<=0x0&&this['startNewTauntAnimation']();},Sprite_Battler[_0x244290(0x330)][_0x244290(0x1fc)]=function(){const _0x24f2c1=_0x244290;this[_0x24f2c1(0x221)]=Sprite_Battler[_0x24f2c1(0x20d)];if(!this[_0x24f2c1(0x374)])return;if(!this['_battler'][_0x24f2c1(0x322)]())return;const _0x18967f=[this[_0x24f2c1(0x374)]],_0x192b8c=this[_0x24f2c1(0x248)](),_0x82229e=this[_0x24f2c1(0x374)]['isActor']()&&Sprite_Battler[_0x24f2c1(0x35d)],_0x25572f=Sprite_Battler[_0x24f2c1(0x1e2)];$gameTemp[_0x24f2c1(0x336)](_0x18967f,_0x192b8c,_0x82229e,_0x25572f);},Sprite_Battler[_0x244290(0x330)][_0x244290(0x248)]=function(){const _0x5c2238=_0x244290;let _0xf89d=this[_0x5c2238(0x296)][_0x5c2238(0x365)];while(_0xf89d){if(_0x5c2238(0x32f)===_0x5c2238(0x294))this[_0x5c2238(0x1d4)]={};else{const _0x30ed81=this['_tauntAnimationCycle']['shift']();this[_0x5c2238(0x296)][_0x5c2238(0x1da)](_0x30ed81);const _0x5efec2='%1Taunt'[_0x5c2238(0x236)](_0x30ed81);if(this[_0x5c2238(0x374)][_0x5efec2]()){const _0x5b40f6=_0x5c2238(0x326)['format'](_0x30ed81),_0x2ef9ed=Sprite_Battler[_0x5b40f6];if(_0x2ef9ed)return _0x2ef9ed;}_0xf89d--;}}return Sprite_Battler['_certainHitTauntAnimation'];},VisuMZ['AggroControlSystem']['Sprite_Actor_createStateSprite']=Sprite_Actor[_0x244290(0x330)][_0x244290(0x1e4)],Sprite_Actor['prototype']['createStateSprite']=function(){const _0x1bb91e=_0x244290;VisuMZ[_0x1bb91e(0x2b7)][_0x1bb91e(0x334)][_0x1bb91e(0x369)](this),this[_0x1bb91e(0x292)]();},Sprite_Actor[_0x244290(0x330)][_0x244290(0x292)]=function(){const _0xa58eff=_0x244290;if(this[_0xa58eff(0x1e8)]!==Sprite_Actor)return;if(!this['isAggroGaugeVisible']())return;if(!SceneManager[_0xa58eff(0x2e4)]())return;const _0x1e4ba5=VisuMZ[_0xa58eff(0x2b7)][_0xa58eff(0x24d)][_0xa58eff(0x25d)],_0x438308=new Sprite_Gauge();_0x438308[_0xa58eff(0x33a)]['x']=_0x1e4ba5[_0xa58eff(0x255)],_0x438308[_0xa58eff(0x33a)]['y']=_0x1e4ba5[_0xa58eff(0x1d7)];const _0x1fd0e4=Sprite_Gauge[_0xa58eff(0x330)][_0xa58eff(0x33d)]();_0x438308[_0xa58eff(0x2f5)]['x']=_0x438308[_0xa58eff(0x2f5)]['y']=_0x1e4ba5[_0xa58eff(0x285)],this[_0xa58eff(0x29f)]=_0x438308,this['addChild'](_0x438308);},Sprite_Actor[_0x244290(0x330)]['isAggroGaugeVisible']=function(){const _0x5a5be7=_0x244290;if(Imported['VisuMZ_1_BattleCore']&&this[_0x5a5be7(0x1e8)]===Sprite_SvEnemy)return![];return ConfigManager[_0x5a5be7(0x366)]&&VisuMZ['AggroControlSystem']['Settings'][_0x5a5be7(0x25d)]['VisibleGauge'];},VisuMZ[_0x244290(0x2b7)][_0x244290(0x2e7)]=Sprite_Actor[_0x244290(0x330)][_0x244290(0x1f2)],Sprite_Actor['prototype'][_0x244290(0x1f2)]=function(){const _0x3c2215=_0x244290;VisuMZ[_0x3c2215(0x2b7)][_0x3c2215(0x2e7)]['call'](this),this[_0x3c2215(0x2f2)]();},Sprite_Actor[_0x244290(0x330)][_0x244290(0x2f2)]=function(){const _0x42b19c=_0x244290;if(!this[_0x42b19c(0x374)])return;if(!this[_0x42b19c(0x29f)])return;const _0x27ee3a=VisuMZ[_0x42b19c(0x2b7)][_0x42b19c(0x24d)][_0x42b19c(0x25d)],_0x2974dd=this[_0x42b19c(0x29f)];let _0x292b45=_0x27ee3a[_0x42b19c(0x359)];if(this[_0x42b19c(0x374)]['battleUIOffsetX']){if(_0x42b19c(0x314)===_0x42b19c(0x228)){const _0x12b055=this[_0x42b19c(0x1ec)](),_0xcb686=this[_0x42b19c(0x2e0)]()[_0x42b19c(0x2b1)](_0xdaaf4e=>_0xdaaf4e[_0x42b19c(0x22d)]===_0x12b055);this['_highestTgrMember']=_0xcb686[_0x377e52[_0x42b19c(0x22b)](_0xcb686[_0x42b19c(0x365)])]||this[_0x42b19c(0x2a8)]();}else _0x292b45+=this[_0x42b19c(0x374)]['battleUIOffsetX']();}let _0x55b7a9=_0x27ee3a[_0x42b19c(0x1f1)];this[_0x42b19c(0x374)][_0x42b19c(0x216)]&&(_0x55b7a9+=this['_battler']['battleUIOffsetY']()),_0x2974dd['x']=_0x292b45,_0x2974dd['y']=-this[_0x42b19c(0x2b4)]+_0x55b7a9,this[_0x42b19c(0x374)]&&_0x2974dd[_0x42b19c(0x2da)]!==_0x42b19c(0x281)&&(_0x2974dd[_0x42b19c(0x323)]=!![],_0x2974dd[_0x42b19c(0x35a)](this[_0x42b19c(0x374)],_0x42b19c(0x281))),this[_0x42b19c(0x2f5)]['x']<0x0&&(_0x2974dd['scale']['x']=-Math[_0x42b19c(0x33e)](_0x2974dd[_0x42b19c(0x2f5)]['x']));},Sprite_Gauge['prototype'][_0x244290(0x240)]=function(){const _0x29e1bb=_0x244290;return this[_0x29e1bb(0x374)]&&this[_0x29e1bb(0x2da)]==='aggro';},VisuMZ[_0x244290(0x2b7)][_0x244290(0x2c9)]=Sprite_Gauge[_0x244290(0x330)][_0x244290(0x358)],Sprite_Gauge[_0x244290(0x330)][_0x244290(0x358)]=function(){const _0x4999a1=_0x244290;if(this[_0x4999a1(0x240)]()){if(_0x4999a1(0x32b)!==_0x4999a1(0x32b)){const _0x2fc937=this[_0x4999a1(0x340)](_0x5732ec),_0x4ad149=this[_0x4999a1(0x20e)](_0x5dcad4),_0x1efe97=this[_0x4999a1(0x377)](_0x113634),_0x571c9c='actor%1-gauge-aggro'[_0x4999a1(0x236)](_0x2fc937[_0x4999a1(0x2a0)]()),_0x6a1ab=this[_0x4999a1(0x274)](_0x571c9c,_0xc814b4),_0x53a841=_0x10608e[_0x4999a1(0x2b7)][_0x4999a1(0x24d)][_0x4999a1(0x25d)];_0x6a1ab['x']=_0x4ad149+(_0x53a841[_0x4999a1(0x2b3)]||0x0),_0x6a1ab['y']=_0x1efe97+(_0x53a841[_0x4999a1(0x29a)]||0x0),_0x6a1ab[_0x4999a1(0x2e3)]=!![],_0x6a1ab['setup'](_0x2fc937,_0x4999a1(0x281)),_0x6a1ab[_0x4999a1(0x323)]=!![];}else return 0x0;}else return _0x4999a1(0x2bb)!==_0x4999a1(0x2bb)?_0x406638+_0xa989a9(_0x2a235f['$1'])/0x64:VisuMZ[_0x4999a1(0x2b7)]['Sprite_Gauge_gaugeX']['call'](this);},VisuMZ['AggroControlSystem']['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x244290(0x330)][_0x244290(0x280)],Sprite_Gauge['prototype'][_0x244290(0x280)]=function(){const _0x3c8202=_0x244290;let _0x419e0c=VisuMZ[_0x3c8202(0x2b7)][_0x3c8202(0x312)]['call'](this);if(this['isAggroType']()&&this[_0x3c8202(0x374)]){if(this[_0x3c8202(0x374)][_0x3c8202(0x23e)]())return 0x0;if(this[_0x3c8202(0x374)][_0x3c8202(0x33f)]()&&this['_battler']['friendsUnit']()['aliveMembers']()[_0x3c8202(0x365)]===0x1)return 0x1;}return _0x419e0c['clamp'](0x0,0x1);},VisuMZ['AggroControlSystem'][_0x244290(0x2dd)]=Sprite_Gauge[_0x244290(0x330)][_0x244290(0x36c)],Sprite_Gauge[_0x244290(0x330)][_0x244290(0x36c)]=function(){const _0x3e54cd=_0x244290;return this[_0x3e54cd(0x240)]()?this['currentValueAggroControl']():VisuMZ[_0x3e54cd(0x2b7)][_0x3e54cd(0x2dd)][_0x3e54cd(0x369)](this);},Sprite_Gauge['prototype'][_0x244290(0x1f0)]=function(){const _0x3e7c82=_0x244290,_0x4341fe=this[_0x3e7c82(0x374)][_0x3e7c82(0x1fa)](),_0x399218=this[_0x3e7c82(0x374)]['tgr']-_0x4341fe[_0x3e7c82(0x249)](),_0x5e7886=_0x4341fe['tgrMax']()-_0x4341fe[_0x3e7c82(0x249)]();if(_0x399218>=_0x5e7886)return 0x64;return _0x399218/Math[_0x3e7c82(0x332)](_0x5e7886,0x1)*0x64;},VisuMZ[_0x244290(0x2b7)][_0x244290(0x327)]=Sprite_Gauge[_0x244290(0x330)]['currentMaxValue'],Sprite_Gauge['prototype']['currentMaxValue']=function(){const _0x50456e=_0x244290;return this[_0x50456e(0x240)]()?this[_0x50456e(0x266)]():VisuMZ[_0x50456e(0x2b7)]['Sprite_Gauge_currentMaxValue'][_0x50456e(0x369)](this);},Sprite_Gauge['prototype'][_0x244290(0x266)]=function(){return 0x64;},VisuMZ[_0x244290(0x2b7)]['Sprite_Gauge_gaugeColor1']=Sprite_Gauge[_0x244290(0x330)][_0x244290(0x342)],Sprite_Gauge[_0x244290(0x330)][_0x244290(0x342)]=function(){const _0x355c58=_0x244290;if(this[_0x355c58(0x240)]()){if(_0x355c58(0x2aa)!==_0x355c58(0x2aa)){const _0x1ea00b=_0x4c95d2['smoothTarget'](this[_0x355c58(0x34b)]);return _0x1ea00b[_0x355c58(0x1d5)](this[_0x355c58(0x26b)]()[_0x355c58(0x1e7)])?[_0x1ea00b]:[_0x4c0464[_0x355c58(0x333)]()];}else return ColorManager['aggroGaugeColor1']();}else{if(_0x355c58(0x2ca)===_0x355c58(0x2ca))return VisuMZ[_0x355c58(0x2b7)][_0x355c58(0x1e3)]['call'](this);else _0x3d5056=_0x3eadf0[_0x355c58(0x332)](_0xed2e5a,_0x488f49);}},VisuMZ[_0x244290(0x2b7)][_0x244290(0x273)]=Sprite_Gauge[_0x244290(0x330)]['gaugeColor2'],Sprite_Gauge[_0x244290(0x330)][_0x244290(0x219)]=function(){const _0x557294=_0x244290;if(this[_0x557294(0x240)]()){if('dHDEp'===_0x557294(0x2c1)){const _0x43a959=_0x557294(0x2db);this[_0x557294(0x2d0)]=this['_colorCache']||{};if(this['_colorCache'][_0x43a959])return this[_0x557294(0x2d0)][_0x43a959];const _0x37e363=_0x3332f6[_0x557294(0x2b7)][_0x557294(0x24d)][_0x557294(0x32d)][_0x557294(0x27e)];return this['getColorDataFromPluginParameters'](_0x43a959,_0x37e363);}else return ColorManager['aggroGaugeColor2']();}else return VisuMZ[_0x557294(0x2b7)][_0x557294(0x273)][_0x557294(0x369)](this);},VisuMZ[_0x244290(0x2b7)]['Sprite_Gauge_update']=Sprite_Gauge[_0x244290(0x330)][_0x244290(0x1f2)],Sprite_Gauge[_0x244290(0x330)][_0x244290(0x1f2)]=function(){const _0x4f02e4=_0x244290;VisuMZ[_0x4f02e4(0x2b7)][_0x4f02e4(0x2d1)][_0x4f02e4(0x369)](this),this[_0x4f02e4(0x2ba)]();},Sprite_Gauge[_0x244290(0x330)][_0x244290(0x2ba)]=function(){const _0x3670f6=_0x244290;if(!this[_0x3670f6(0x240)]())return;if(!Imported[_0x3670f6(0x2ff)])return;const _0x5a227f=this['_battler']['battler']();if(this[_0x3670f6(0x2e3)])this[_0x3670f6(0x204)]=0xff;else _0x5a227f&&_0x5a227f[_0x3670f6(0x204)]>0x0?this[_0x3670f6(0x204)]=0xff:this[_0x3670f6(0x204)]=0x0;},VisuMZ[_0x244290(0x2b7)][_0x244290(0x31c)]=Sprite_Gauge[_0x244290(0x330)][_0x244290(0x241)],Sprite_Gauge[_0x244290(0x330)][_0x244290(0x241)]=function(){const _0x59621f=_0x244290;if(this[_0x59621f(0x240)]())return;VisuMZ[_0x59621f(0x2b7)][_0x59621f(0x31c)]['call'](this);};function Sprite_ProvokeTrail(){const _0x2ae3ee=_0x244290;this[_0x2ae3ee(0x31a)](...arguments);}function _0x51a2(_0x3bc3cb,_0x47701a){const _0x249802=_0x2498();return _0x51a2=function(_0x51a2ed,_0x5a3534){_0x51a2ed=_0x51a2ed-0x1cf;let _0x1f32e2=_0x249802[_0x51a2ed];return _0x1f32e2;},_0x51a2(_0x3bc3cb,_0x47701a);}Sprite_ProvokeTrail[_0x244290(0x330)]=Object['create'](Sprite[_0x244290(0x330)]),Sprite_ProvokeTrail[_0x244290(0x330)][_0x244290(0x1e8)]=Sprite_ProvokeTrail,Sprite_ProvokeTrail[_0x244290(0x330)]['initialize']=function(_0x48a0d7){const _0x5dbd6e=_0x244290;this[_0x5dbd6e(0x30f)]=_0x48a0d7,Sprite[_0x5dbd6e(0x330)][_0x5dbd6e(0x31a)][_0x5dbd6e(0x369)](this),this[_0x5dbd6e(0x214)](),this[_0x5dbd6e(0x25a)]();},Sprite_ProvokeTrail['prototype'][_0x244290(0x214)]=function(){const _0x1c94e6=_0x244290,_0x373908=VisuMZ[_0x1c94e6(0x2b7)][_0x1c94e6(0x24d)][_0x1c94e6(0x32d)];this[_0x1c94e6(0x33a)]['x']=0.5,this[_0x1c94e6(0x33a)]['y']=0.5,this['_homeX']=0x0,this[_0x1c94e6(0x1f7)]=0x0,this[_0x1c94e6(0x232)]=0x0,this[_0x1c94e6(0x27a)]=0x0,this[_0x1c94e6(0x204)]=0x0,this[_0x1c94e6(0x291)]=_0x373908[_0x1c94e6(0x298)],this[_0x1c94e6(0x243)]=_0x373908['BlendMode'];},Sprite_ProvokeTrail[_0x244290(0x330)][_0x244290(0x234)]=function(){const _0x458a0a=_0x244290;return VisuMZ[_0x458a0a(0x2b7)][_0x458a0a(0x24d)][_0x458a0a(0x32d)][_0x458a0a(0x337)];},Sprite_ProvokeTrail[_0x244290(0x330)][_0x244290(0x372)]=function(){const _0x57d614=_0x244290;return VisuMZ['AggroControlSystem'][_0x57d614(0x24d)][_0x57d614(0x32d)]['PartsSize']/0x64;},Sprite_ProvokeTrail[_0x244290(0x330)]['createChildSprites']=function(){const _0x9e2cd0=_0x244290;this[_0x9e2cd0(0x246)]=[];let _0x3dbc31=0x0;for(let _0x28340c=0x0;_0x28340c<=this['maxSprites']();_0x28340c++){const _0x2d6344=new Sprite();_0x2d6344[_0x9e2cd0(0x2be)]=ImageManager[_0x9e2cd0(0x36b)](),_0x2d6344['anchor']['x']=0.5,_0x2d6344[_0x9e2cd0(0x33a)]['y']=0.5,_0x2d6344['scale']['x']=_0x2d6344[_0x9e2cd0(0x2f5)]['y']=this[_0x9e2cd0(0x372)](),_0x2d6344[_0x9e2cd0(0x204)]=_0x3dbc31,_0x2d6344[_0x9e2cd0(0x243)]=this['blendMode'],this[_0x9e2cd0(0x371)](_0x2d6344),this['_sprites'][_0x9e2cd0(0x1da)](_0x2d6344),_0x3dbc31+=this['_opacitySpeed'];if(_0x3dbc31>=0xff)_0x3dbc31=0x0;}},Sprite_ProvokeTrail[_0x244290(0x330)][_0x244290(0x1ed)]=function(){const _0x3e37f7=_0x244290;return this[_0x3e37f7(0x30f)][_0x3e37f7(0x1e8)]===Sprite_Actor;},Sprite_ProvokeTrail[_0x244290(0x330)][_0x244290(0x267)]=function(){const _0x39c03d=_0x244290;return SceneManager[_0x39c03d(0x1e1)][_0x39c03d(0x1dc)][_0x39c03d(0x1dd)];},Sprite_ProvokeTrail['prototype'][_0x244290(0x1f2)]=function(){const _0x2deede=_0x244290;Sprite[_0x2deede(0x330)]['update'][_0x2deede(0x369)](this),this[_0x2deede(0x209)](),this[_0x2deede(0x2c4)](),this['updateOpacity'](),this[_0x2deede(0x2ab)]();},Sprite_ProvokeTrail[_0x244290(0x330)]['heightOrigin']=function(){const _0x271b0d=_0x244290;return VisuMZ[_0x271b0d(0x2b7)][_0x271b0d(0x24d)][_0x271b0d(0x32d)][_0x271b0d(0x2d5)];},Sprite_ProvokeTrail['prototype'][_0x244290(0x209)]=function(){const _0x22d2f5=_0x244290;if(!this[_0x22d2f5(0x30f)]['_battler'])return;if(!this[_0x22d2f5(0x30f)][_0x22d2f5(0x374)]['provoker']())return;const _0x59dbdc=this['_mainSprite'][_0x22d2f5(0x374)][_0x22d2f5(0x36e)]()['battler']();if(!_0x59dbdc)return;const _0x34be5e=this['_mainSprite']['_battler'][_0x22d2f5(0x30c)](),_0x3d61ac=this['_mainSprite'][_0x22d2f5(0x374)][_0x22d2f5(0x36e)]()[_0x22d2f5(0x30c)]();this['_homeX']=this[_0x22d2f5(0x30f)]['x'],this['_homeY']=this[_0x22d2f5(0x30f)]['y']-this[_0x22d2f5(0x30f)][_0x22d2f5(0x2b4)]*_0x34be5e,this[_0x22d2f5(0x232)]=_0x59dbdc['x'],this[_0x22d2f5(0x27a)]=_0x59dbdc['y']-_0x59dbdc[_0x22d2f5(0x2b4)]*_0x3d61ac,this['_homeX']+=Math[_0x22d2f5(0x2b5)]((Graphics['width']-Graphics['boxWidth'])/0x2),this[_0x22d2f5(0x1f7)]+=Math[_0x22d2f5(0x2b5)]((Graphics[_0x22d2f5(0x2b4)]-Graphics[_0x22d2f5(0x319)])/0x2),this['_targetX']+=Math[_0x22d2f5(0x2b5)]((Graphics['width']-Graphics[_0x22d2f5(0x23f)])/0x2),this['_targetY']+=Math['round']((Graphics[_0x22d2f5(0x2b4)]-Graphics['boxHeight'])/0x2);if(!$gameSystem['isSideView']()){if(_0x59dbdc[_0x22d2f5(0x374)]['isActor']())visible=!![],this[_0x22d2f5(0x232)]+=SceneManager[_0x22d2f5(0x1e1)]['_statusWindow']['x'],this[_0x22d2f5(0x27a)]+=SceneManager[_0x22d2f5(0x1e1)][_0x22d2f5(0x30a)]['y'];else _0x59dbdc['_battler'][_0x22d2f5(0x34f)]()&&(visible=!![],this[_0x22d2f5(0x1ea)]+=SceneManager['_scene'][_0x22d2f5(0x30a)]['x'],this[_0x22d2f5(0x1f7)]+=SceneManager[_0x22d2f5(0x1e1)]['_statusWindow']['y']);}},Sprite_ProvokeTrail['prototype'][_0x244290(0x239)]=function(){const _0x16e509=_0x244290;return VisuMZ['AggroControlSystem']['Settings'][_0x16e509(0x32d)]['ArcHeight'];},Sprite_ProvokeTrail[_0x244290(0x330)][_0x244290(0x2c4)]=function(){const _0x4bf2b7=_0x244290;if(!this[_0x4bf2b7(0x30f)]['_battler'])return;if(!this['_mainSprite'][_0x4bf2b7(0x374)][_0x4bf2b7(0x36e)]())return;if(!this[_0x4bf2b7(0x246)])return;if(this[_0x4bf2b7(0x246)][_0x4bf2b7(0x365)]<=0x0)return;const _0xab6b1e=(this['_targetX']-this[_0x4bf2b7(0x1ea)])/this[_0x4bf2b7(0x234)](),_0x5bae7d=(this[_0x4bf2b7(0x27a)]-this[_0x4bf2b7(0x1f7)])/this[_0x4bf2b7(0x234)]();for(let _0x1bed0c=0x0;_0x1bed0c<=this[_0x4bf2b7(0x234)]();_0x1bed0c++){if('ybCih'!==_0x4bf2b7(0x2d2)){const _0x218a95=this[_0x4bf2b7(0x246)][_0x1bed0c];if(!_0x218a95)continue;_0x218a95['x']=this[_0x4bf2b7(0x1ea)]+_0xab6b1e*_0x1bed0c;const _0x5ea3d1=this['maxSprites']()-_0x1bed0c,_0x574b89=this[_0x4bf2b7(0x234)]()/0x2,_0x609142=this['arcHeight'](),_0x3db5b2=-_0x609142/Math[_0x4bf2b7(0x1f3)](_0x574b89,0x2),_0x215c76=_0x3db5b2*Math['pow'](_0x5ea3d1-_0x574b89,0x2)+_0x609142;_0x218a95['y']=this['_homeY']+_0x5bae7d*_0x1bed0c-_0x215c76;}else this[_0x4bf2b7(0x1d0)]();}},Sprite_ProvokeTrail[_0x244290(0x330)][_0x244290(0x1d9)]=function(){const _0x25666d=_0x244290;return VisuMZ[_0x25666d(0x2b7)][_0x25666d(0x24d)][_0x25666d(0x32d)][_0x25666d(0x245)];},Sprite_ProvokeTrail[_0x244290(0x330)][_0x244290(0x354)]=function(){const _0x31bce6=_0x244290,_0x1d5068=this['_mainSprite'][_0x31bce6(0x374)];if(!_0x1d5068)this[_0x31bce6(0x204)]=0x0;else{if(_0x1d5068[_0x31bce6(0x33f)]()&&_0x1d5068['provoker']()){if(_0x31bce6(0x265)===_0x31bce6(0x265))this[_0x31bce6(0x204)]=0xff;else return 0x0;}else this[_0x31bce6(0x204)]=0x0;}},Sprite_ProvokeTrail[_0x244290(0x330)]['updateChildrenOpacity']=function(){const _0x2a0447=_0x244290;if(!this['_mainSprite'][_0x2a0447(0x374)])return;if(!this[_0x2a0447(0x30f)][_0x2a0447(0x374)][_0x2a0447(0x36e)]())return;if(!this[_0x2a0447(0x246)])return;if(this[_0x2a0447(0x246)][_0x2a0447(0x365)]<=0x0)return;for(let _0x5d271b=0x0;_0x5d271b<=this[_0x2a0447(0x234)]();_0x5d271b++){const _0x162881=this[_0x2a0447(0x246)][this['leftwardAnimation']()?this['maxSprites']()-_0x5d271b:_0x5d271b];if(!_0x162881)continue;_0x162881[_0x2a0447(0x204)]-=this[_0x2a0447(0x291)];if(_0x162881[_0x2a0447(0x204)]<=0x0)_0x162881[_0x2a0447(0x204)]=0xff;}},VisuMZ['AggroControlSystem'][_0x244290(0x348)]=Spriteset_Battle[_0x244290(0x330)][_0x244290(0x23d)],Spriteset_Battle[_0x244290(0x330)][_0x244290(0x23d)]=function(){const _0x48ab2f=_0x244290;VisuMZ[_0x48ab2f(0x2b7)][_0x48ab2f(0x348)][_0x48ab2f(0x369)](this),this[_0x48ab2f(0x1df)]();},Spriteset_Battle[_0x244290(0x330)][_0x244290(0x1df)]=function(){const _0x29dd9a=_0x244290;if(!Imported[_0x29dd9a(0x2ff)])return;const _0x383bfc=this[_0x29dd9a(0x29d)]['x'],_0xfb8f09=this['_battleField']['y'],_0xb94da=this['_battleField']['width'],_0x33d4f0=this['_battleField']['height'];this[_0x29dd9a(0x1dd)]=new Sprite(),this[_0x29dd9a(0x1dd)][_0x29dd9a(0x21e)](0x0,0x0,_0xb94da,_0x33d4f0),this[_0x29dd9a(0x1dd)]['x']=_0x383bfc,this[_0x29dd9a(0x1dd)]['y']=_0xfb8f09;if(Imported[_0x29dd9a(0x2ff)]){if(_0x29dd9a(0x1d3)===_0x29dd9a(0x215))return this[_0x29dd9a(0x2b0)]()[_0x29dd9a(0x26d)](_0x32818a=>_0x32818a&&_0x32818a[_0x29dd9a(0x1ff)]['match'](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));else{const _0x1dd2be=this[_0x29dd9a(0x244)]['indexOf'](this[_0x29dd9a(0x207)]);this[_0x29dd9a(0x2a5)](this[_0x29dd9a(0x1dd)],_0x1dd2be);}}else this[_0x29dd9a(0x371)](this[_0x29dd9a(0x1dd)]);},VisuMZ[_0x244290(0x2b7)][_0x244290(0x30e)]=Spriteset_Battle[_0x244290(0x330)][_0x244290(0x1f2)],Spriteset_Battle[_0x244290(0x330)][_0x244290(0x1f2)]=function(){const _0x31ca87=_0x244290;VisuMZ[_0x31ca87(0x2b7)][_0x31ca87(0x30e)][_0x31ca87(0x369)](this),this[_0x31ca87(0x318)]();},Spriteset_Battle[_0x244290(0x330)][_0x244290(0x318)]=function(){const _0x3baf5e=_0x244290;if(!this[_0x3baf5e(0x1dd)])return;if(!this[_0x3baf5e(0x207)])return;this[_0x3baf5e(0x1dd)]['x']=this[_0x3baf5e(0x207)]['x'],this[_0x3baf5e(0x1dd)]['y']=this[_0x3baf5e(0x207)]['y'];},VisuMZ[_0x244290(0x2b7)][_0x244290(0x253)]=Window_BattleEnemy[_0x244290(0x330)][_0x244290(0x1e6)],Window_BattleEnemy[_0x244290(0x330)][_0x244290(0x1e6)]=function(){const _0x4d4543=_0x244290;if(this[_0x4d4543(0x2d4)]()){if(_0x4d4543(0x297)===_0x4d4543(0x22a))return _0xea89c5['actor'](_0x8ed23b(_0x1e1d37['$1']));else Imported[_0x4d4543(0x2ff)]&&('AXyym'!==_0x4d4543(0x2a3)?(_0x3a3ff8['AggroControlSystem']['Sprite_Gauge_update'][_0x4d4543(0x369)](this),this['updateOpacityAggroControl']()):this[_0x4d4543(0x1d0)]()),Window_Selectable[_0x4d4543(0x330)][_0x4d4543(0x1e6)][_0x4d4543(0x369)](this);}else this['applyTauntFilters']()?(Imported['VisuMZ_1_BattleCore']&&this[_0x4d4543(0x1d0)](),Window_Selectable['prototype']['refresh'][_0x4d4543(0x369)](this)):VisuMZ['AggroControlSystem'][_0x4d4543(0x253)][_0x4d4543(0x369)](this);},Window_BattleEnemy[_0x244290(0x330)]['applyProvokeFilters']=function(){const _0x4cc856=_0x244290,_0x192ffe=BattleManager[_0x4cc856(0x34c)](),_0x3522d8=BattleManager['actor']();if(!_0x192ffe)return![];if(!_0x3522d8)return![];if(DataManager[_0x4cc856(0x261)](_0x192ffe[_0x4cc856(0x26b)]()))return![];if(_0x3522d8[_0x4cc856(0x300)]())return![];if(!_0x192ffe[_0x4cc856(0x205)]())return![];if(_0x3522d8[_0x4cc856(0x205)]()){this[_0x4cc856(0x325)]=[_0x3522d8[_0x4cc856(0x36e)]()];if(_0x192ffe['isForAnyone']&&_0x192ffe[_0x4cc856(0x1f4)]()){if(_0x4cc856(0x28a)===_0x4cc856(0x28a)){const _0x6feffd=$gameParty[_0x4cc856(0x2e0)]();this[_0x4cc856(0x325)]=this[_0x4cc856(0x325)][_0x4cc856(0x2fd)](_0x6feffd);if(_0x192ffe[_0x4cc856(0x20b)]&&_0x192ffe[_0x4cc856(0x20b)]()&&_0x6feffd[_0x4cc856(0x365)]>0x1){if(_0x4cc856(0x23a)!==_0x4cc856(0x23a))return this[_0x4cc856(0x2c8)](_0x1f42df);else this[_0x4cc856(0x2f9)](_0x4cc856(0x208),this[_0x4cc856(0x2b9)][_0x4cc856(0x345)](this));}}else{const _0x379548=_0x3d0355['AggroPerHeal'];this[_0x4cc856(0x238)]()[_0x4cc856(0x34a)](_0x379548*_0x460ec2[_0x4cc856(0x33e)](_0x5fa716));}}return!![];}else return![];},Window_BattleEnemy['prototype']['applyTauntFilters']=function(){const _0x570423=_0x244290,_0x400ba9=BattleManager[_0x570423(0x34c)](),_0x36aaba=BattleManager[_0x570423(0x340)](),_0x4fe315=$gameTroop;if(!_0x400ba9)return![];if(!_0x36aaba)return![];if(!_0x400ba9['item']())return![];if(DataManager[_0x570423(0x2b8)](_0x400ba9['item']()))return![];if(_0x36aaba[_0x570423(0x23c)]())return![];if(!_0x400ba9[_0x570423(0x200)]())return![];if(_0x400ba9[_0x570423(0x316)]()&&_0x4fe315[_0x570423(0x24b)]()['length']>0x0)this[_0x570423(0x325)]=_0x4fe315[_0x570423(0x24b)]();else{if(_0x400ba9[_0x570423(0x1e9)]()&&_0x4fe315[_0x570423(0x225)]()[_0x570423(0x365)]>0x0){if(_0x570423(0x235)!=='coFzo')this[_0x570423(0x325)]=_0x4fe315[_0x570423(0x225)]();else{if(!_0x3b4012)return![];return _0x4bddce[_0x570423(0x1ff)][_0x570423(0x212)](/<BYPASS TAUNT>/i);}}else{if(_0x400ba9[_0x570423(0x2a9)]()&&_0x4fe315[_0x570423(0x34d)]()['length']>0x0)this[_0x570423(0x325)]=_0x4fe315['certainHitTauntMembers']();else{if(_0x570423(0x310)!==_0x570423(0x310)){const _0x5eebec=_0x473d8a(_0x4712d8['$1']);_0x4237a0[_0x570423(0x2af)]=this[_0x570423(0x238)](),_0x499080['item']=this[_0x570423(0x26b)](),_0x1e6e18['a']=this[_0x570423(0x238)](),_0x27c6e0['b']=_0x96b2fc,_0x47ebdc['value']=_0x38b2b7[_0x570423(0x201)]();try{_0x4e670e(_0x5eebec);}catch(_0x98357e){if(_0x3d792f[_0x570423(0x2fc)]())_0x5f3b23[_0x570423(0x324)](_0x98357e);}_0x19a4b9[_0x570423(0x264)](_0x43b269[_0x570423(0x202)]),_0x1b63ea['user']=_0x84a176,_0x12f147[_0x570423(0x1ee)]=_0x2c1c0c,_0xc8b2c7[_0x570423(0x26b)]=_0x1d3e33,_0x5c9fe4['a']=_0x1a2636,_0x52a020['b']=_0xf4489d,_0x156aee[_0x570423(0x202)]=_0x88583c;}else return![];}}}if(_0x400ba9[_0x570423(0x1f4)]&&_0x400ba9[_0x570423(0x1f4)]()){const _0x34a528=$gameParty[_0x570423(0x2e0)]();this[_0x570423(0x325)]=this['_enemies'][_0x570423(0x2fd)](_0x34a528),_0x400ba9[_0x570423(0x20b)]&&_0x400ba9['canSingleOrMultipleSelect']()&&_0x34a528['length']>0x1&&this[_0x570423(0x2f9)](_0x570423(0x208),this[_0x570423(0x2b9)][_0x570423(0x345)](this));}return!![];},VisuMZ[_0x244290(0x2b7)][_0x244290(0x349)]=Window_Options[_0x244290(0x330)][_0x244290(0x361)],Window_Options[_0x244290(0x330)][_0x244290(0x361)]=function(){const _0x47d620=_0x244290;VisuMZ[_0x47d620(0x2b7)][_0x47d620(0x349)][_0x47d620(0x369)](this),this[_0x47d620(0x269)]();},Window_Options[_0x244290(0x330)][_0x244290(0x269)]=function(){const _0x31730d=_0x244290;VisuMZ[_0x31730d(0x2b7)][_0x31730d(0x24d)][_0x31730d(0x32d)][_0x31730d(0x217)]&&this[_0x31730d(0x271)]();if(VisuMZ[_0x31730d(0x2b7)][_0x31730d(0x24d)][_0x31730d(0x25d)][_0x31730d(0x217)]){if(_0x31730d(0x26a)!==_0x31730d(0x2d7))this['addAggroControlSystemAggroCommand']();else{const _0x510150=_0x1b2637['aliveMembers']();this[_0x31730d(0x325)]=this['_enemies'][_0x31730d(0x2fd)](_0x510150),_0x2a3e3c[_0x31730d(0x20b)]&&_0xa9dbb5[_0x31730d(0x20b)]()&&_0x510150[_0x31730d(0x365)]>0x1&&this[_0x31730d(0x2f9)](_0x31730d(0x208),this[_0x31730d(0x2b9)][_0x31730d(0x345)](this));}}},Window_Options[_0x244290(0x330)][_0x244290(0x271)]=function(){const _0x443b33=_0x244290,_0x116a71=TextManager[_0x443b33(0x2c6)],_0x1d709a=_0x443b33(0x2c6);this['addCommand'](_0x116a71,_0x1d709a);},Window_Options[_0x244290(0x330)][_0x244290(0x26c)]=function(){const _0xc9996=_0x244290,_0x571009=TextManager[_0xc9996(0x366)],_0x546551=_0xc9996(0x366);this[_0xc9996(0x2f0)](_0x571009,_0x546551);},VisuMZ[_0x244290(0x2b7)][_0x244290(0x2e2)]=Window_StatusBase[_0x244290(0x330)][_0x244290(0x35c)],Window_StatusBase[_0x244290(0x330)][_0x244290(0x35c)]=function(_0x23b5a8,_0x20c31b,_0x2c9048){const _0x101f78=_0x244290;if(this[_0x101f78(0x20a)]())this[_0x101f78(0x335)](_0x23b5a8[_0x101f78(0x1e0)]());VisuMZ[_0x101f78(0x2b7)][_0x101f78(0x2e2)][_0x101f78(0x369)](this,_0x23b5a8,_0x20c31b,_0x2c9048);},Window_StatusBase['prototype'][_0x244290(0x20a)]=function(){const _0x3e92ad=_0x244290;if(![Window_BattleActor,Window_BattleStatus][_0x3e92ad(0x237)](this[_0x3e92ad(0x1e8)]))return![];if(!SceneManager['isSceneBattle']())return![];return ConfigManager[_0x3e92ad(0x366)]&&VisuMZ[_0x3e92ad(0x2b7)]['Settings'][_0x3e92ad(0x25d)][_0x3e92ad(0x2bc)];},Window_StatusBase['prototype'][_0x244290(0x24a)]=function(_0x15c751,_0x549013,_0x3b4a7a){const _0x21957c=_0x244290;this[_0x21957c(0x31f)](_0x15c751,_0x21957c(0x281),_0x549013,_0x3b4a7a);},Window_BattleStatus[_0x244290(0x330)][_0x244290(0x335)]=function(_0x2433ef){const _0x2b3d58=_0x244290,_0x291664=this[_0x2b3d58(0x340)](_0x2433ef),_0x254a71=this['aggroGaugeX'](_0x2433ef),_0xc147e4=this[_0x2b3d58(0x377)](_0x2433ef),_0x4a30a8=_0x2b3d58(0x2ce)[_0x2b3d58(0x236)](_0x291664[_0x2b3d58(0x2a0)]()),_0x1bf020=this[_0x2b3d58(0x274)](_0x4a30a8,Sprite_Gauge),_0x530548=VisuMZ[_0x2b3d58(0x2b7)][_0x2b3d58(0x24d)][_0x2b3d58(0x25d)];_0x1bf020['x']=_0x254a71+(_0x530548['BattleStatusOffsetX']||0x0),_0x1bf020['y']=_0xc147e4+(_0x530548['BattleStatusOffsetY']||0x0),_0x1bf020[_0x2b3d58(0x2e3)]=!![],_0x1bf020[_0x2b3d58(0x35a)](_0x291664,_0x2b3d58(0x281)),_0x1bf020[_0x2b3d58(0x323)]=!![];},Window_BattleStatus['prototype']['aggroGaugeX']=function(_0x2962a8){const _0x52abdd=_0x244290;let _0x21f49d=this[_0x52abdd(0x304)](_0x2962a8),_0x383e51=this[_0x52abdd(0x2d3)](_0x21f49d);if(Imported[_0x52abdd(0x2ff)]){let _0x51dbe0=this['itemRect'](_0x2962a8);if(this[_0x52abdd(0x277)]()===_0x52abdd(0x278)){const _0xf8e701=$dataSystem[_0x52abdd(0x27d)]?0x4:0x3,_0x19ea8d=_0xf8e701*0x80+(_0xf8e701-0x1)*0x8+0x4,_0x414405=this[_0x52abdd(0x340)](_0x2962a8);let _0x5202f4=_0x51dbe0['x']+this[_0x52abdd(0x32c)];if(VisuMZ['BattleCore'][_0x52abdd(0x24d)][_0x52abdd(0x32e)]['ShowFacesListStyle'])_0x5202f4=_0x51dbe0['x']+ImageManager['faceWidth']+0x8;else{if(_0x52abdd(0x282)===_0x52abdd(0x2cc)){if(this['isAggroGaugeShown']())this['drawAggroGauge'](_0x70860['index']());_0x571392['AggroControlSystem']['Window_StatusBase_placeActorName'][_0x52abdd(0x369)](this,_0x535f19,_0x41f3b6,_0x3dc100);}else _0x5202f4+=ImageManager[_0x52abdd(0x2e8)];}_0x383e51=Math['round'](Math['min'](_0x51dbe0['x']+_0x51dbe0['width']-_0x19ea8d,_0x5202f4)),_0x383e51-=0x4;}else _0x52abdd(0x317)!==_0x52abdd(0x317)?(_0x70f3b4['AggroControlSystem'][_0x52abdd(0x2a1)]['call'](this,_0x5446e5),this[_0x52abdd(0x257)](_0x221e56)):_0x383e51=Math[_0x52abdd(0x2b5)](_0x51dbe0['x']+(_0x51dbe0[_0x52abdd(0x1d6)]-0x80)/0x2);}return _0x383e51;},Window_BattleStatus[_0x244290(0x330)][_0x244290(0x377)]=function(_0x340085){const _0x490234=_0x244290,_0x41e985=this[_0x490234(0x2c3)](_0x340085);let _0x4e94e0=this['nameY'](_0x41e985);if(Imported[_0x490234(0x2ff)]){if(_0x490234(0x24c)!==_0x490234(0x2a2)){if(this['battleLayoutStyle']()===_0x490234(0x278)){let _0x1e9b13=this[_0x490234(0x2c3)](_0x340085);_0x4e94e0=Math[_0x490234(0x2b5)](_0x1e9b13['y']+(_0x1e9b13[_0x490234(0x2b4)]-Sprite_Name[_0x490234(0x330)][_0x490234(0x262)]())/0x2);}}else _0x4135a2=!![],this['_targetX']+=_0x4e1c83['_scene'][_0x490234(0x30a)]['x'],this[_0x490234(0x27a)]+=_0xa9469f[_0x490234(0x1e1)]['_statusWindow']['y'];}if(this[_0x490234(0x1d8)]())_0x4e94e0-=Sprite_Gauge['prototype'][_0x490234(0x31d)]()-0x1;return _0x4e94e0;},Window_BattleStatus[_0x244290(0x330)][_0x244290(0x1d8)]=function(){const _0x4cf178=_0x244290;if(!BattleManager[_0x4cf178(0x2f1)]())return![];if(Imported[_0x4cf178(0x1e5)])return this[_0x4cf178(0x259)](_0x4cf178(0x36d));return!![];};